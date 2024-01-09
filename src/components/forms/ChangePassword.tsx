"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema, resetPasswordSchema } from "@/lib/validators";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/lib/actions/auth.actions";
import AuthCard from "../cards/AuthCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "../ui/SubmitButton";

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof newPasswordSchema>) {
    if (token) {
      setIsLoading(true);
      const { success, error, expired, invalidToken, validationError } =
        await newPassword({ data, token });

      if (success) {
        toast.success("Password changed successfully");
      } else if (expired || invalidToken) {
        toast.error("could not change password");
      }
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Change your password"
      showSocials={false}
      href="/auth/sign-in"
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
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

          <SubmitButton isLoading={isLoading}>Change Password</SubmitButton>
        </form>
      </Form>
    </AuthCard>
  );
}
