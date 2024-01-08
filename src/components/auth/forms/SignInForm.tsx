"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import AuthCard from "../AuthCard";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "../SubmitButton";

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    const res = await signIn(data);
    setIsLoading(false);

    if (res?.invalidCredentials) {
      toast.error("Invalid email or password");
    } else if (res?.emailSent) {
      toast.success("Email sent");
    }
  }
  return (
    <AuthCard
      title="Sign into your account"
      description="New to Venturevista?"
      linkText="Sign up for an account"
      href="/auth/sign-up"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isLoading={isLoading}>Sign in</SubmitButton>
        </form>
      </Form>
    </AuthCard>
  );
}
