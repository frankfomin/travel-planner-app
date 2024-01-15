"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveTripSchema, signInSchema } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AuthCard from "../cards/AuthCard";
import { signIn } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

import SubmitButton from "../ui/SubmitButton";
import { saveTrip } from "@/lib/actions/trips.action";

export default function SaveTripForm({ length }: { length: number }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof saveTripSchema>>({
    resolver: zodResolver(saveTripSchema),
    defaultValues: {
      tripName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof saveTripSchema>) {
    setIsLoading(true);
    const { success, error, unauthorized } = await saveTrip({ data, length });
    setIsLoading(false);

    if (success) {
      form.reset();
      toast.success("Trip saved successfully");
    } else if (unauthorized) {
      toast.error("You need to be logged in to save a trip");
    } else {
      toast.error("something went wrong");
    }
  }
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tripName"
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
        <SubmitButton isLoading={isLoading}>Save your trip</SubmitButton>
      </form>
    </Form>
  );
}
