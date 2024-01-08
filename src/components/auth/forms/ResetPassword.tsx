"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validators";
import { resetPassword } from "@/lib/actions/auth.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import AuthCard from "../AuthCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "../SubmitButton";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    const { success } = await resetPassword(data);
    setIsLoading(false);

    if (success) {
      toast.success("Check your email for a reset link");
    }
  }

  return (
    <AuthCard
      title="Reset your password"
      showSocials={false}
      href="/auth/sign-in"
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
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

          <SubmitButton isLoading={isLoading}>Reset Password</SubmitButton>
        </form>
      </Form>
    </AuthCard>
  );
}
