"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { use, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TsaveTripSchema, saveTripSchema } from "@/lib/validators/saveTrip";
import { toast } from "sonner";
import SignInForm from "@/app/(auth)/sign-in/components/SignInForm";

type SaveTripProps = {
  locations: string[];
  tripName: string;
};

export default function SaveCachedTrip({ locations }: { locations: string[] }) {
  const session = useSession();

  const { mutate, isLoading, data, status } = useMutation({
    mutationKey: ["saveTrip"],
    mutationFn: async ({ tripName, locations }: SaveTripProps) => {
      const response = await fetch("/api/saveTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripName, locations }),
      });

      const responseData = await response.json();
      return responseData;
    },
    onSuccess: () => {
      toast.success("Trip saved");
    },
    onError: () => {
      toast.error("Error saving trip");
    },
  });

  async function onSubmit(data: TsaveTripSchema) {
    const tripName = data.TripName;
    mutate({ tripName, locations });
  }

  const form = useForm<TsaveTripSchema>({
    resolver: zodResolver(saveTripSchema),
  });

  return (
    <div className="">
      {status === "success" ? null : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Save Trip</Button>
          </DialogTrigger>
          <div className="flex justify-center h-full mt-30">
            <DialogContent className="sm:max-w-[425px] backdrop-blur-sm">
              {!session && (
                <DialogHeader>
                  <DialogDescription>
                    Sign in to save your trip
                  </DialogDescription>
                </DialogHeader>
              )}
              {session.status === "authenticated" ? (
                <Form {...form}>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="TripName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trip name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex">
                      <Button type="submit">Save Trip</Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <SignInForm styles="border-none" />
              )}
            </DialogContent>
          </div>
        </Dialog>
      )}
    </div>
  );
}
