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
import { updateUserInfoSchema } from "@/lib/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/SubmitButton";

export default function DeleteUserForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updateUserInfoSchema>>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      name: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof updateUserInfoSchema>) {
    setIsLoading(true);
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading}>Create your account</SubmitButton>
      </form>
    </Form>
  );
}
