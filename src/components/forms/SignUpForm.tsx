"use client";

import React from "react";
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
import { signUpSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { signUp } from "@/lib/actions/auth.actions";
import AuthCard from "../cards/AuthCard";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "../ui/SubmitButton";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    const { userExists, success, error, validationError } = await signUp(data);
    setIsLoading(false);

    switch (true) {
      case userExists:
        form.setError("email", {
          type: "manual",
          message: "User already exists",
        });
        break;
      case success:
        setSuccess(true);
        break;
      case error:
        console.log(error);
        break;
      case validationError:
        console.log(validationError);
        break;
    }
  }

  return (
    <>
      {success && (
        <CardHeader className="text-center">
          <div className="flex items-center gap-4 justify-center ">
            <CardTitle>Check your email!</CardTitle>
            <Icons.mail className="w-10 h-10 " />
          </div>
          <CardDescription>
            We just sent a verification link to{" "}
            <span className="text-accent-foreground">
              {form.getValues("email") ? form.getValues("email") : "venturevista200@gmail.com"}
            </span>
          </CardDescription>
        </CardHeader>
      )}

      {!success && (
        <AuthCard
          title="Create your account"
          description="Already have an account?"
          linkText="Sign in"
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
              <SubmitButton isLoading={isLoading}>
                Create your account
              </SubmitButton>
            </form>
          </Form>
        </AuthCard>
      )}
    </>
  );
}
