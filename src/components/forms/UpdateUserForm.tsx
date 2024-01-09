"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "@/lib/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/SubmitButton";
import { ExtendedSession } from "@/types";
import { updateUser } from "@/lib/actions/user.actions";
import { toast } from "sonner";

export default function UpdateUserForm({
  user,
}: {
  user: ExtendedSession | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof updateUserSchema>) {
    const userId = user?.id;
    if (!userId) return;
    setIsLoading(true);
    const { error, success, validationError } = await updateUser({
      data,
      userId,
    });
    setIsLoading(false);

    if (error || validationError) {
      toast.error("Something went wrong");
    } else {
      toast.success("Account updated successfully");
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {!user?.isOAuth && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* default value not working */}
                  <Input
                    defaultValue={user?.name || undefined}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={user?.isOAuth}
                  defaultValue={user?.email ?? undefined}
                  {...field}
                />
              </FormControl>
              {user?.isOAuth && (
                <p className="text-muted-foreground text-sm">
                  Your email address is managed by{" "}
                  <span className="capitalize">{user.provider}</span> login
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {!user?.isOAuth && (
          <>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <SubmitButton isLoading={isLoading}>Save account settings</SubmitButton>
      </form>
    </Form>
  );
}
