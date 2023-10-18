"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/types";
import { TsignUpSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: TsignUpSchema) => {
    signUp(data);
  };
  const router = useRouter();
  const {
    mutate: signUp,
    isLoading: signUpLoading,
    data: signUpRes,
    error,
    status,
  } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async ({ email, password }: TsignUpSchema) => {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();

      return responseData;
    },
    onSuccess: () => {
      signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });
      toast.success("Account created");
      router.push("/");
    },
    onError: () => {
      toast.error("Email is invalid or has already been taken.");
    },
  });

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <>
      {isMounted ? (
        <main className="flex h-screen">
          <Link href="/sign-in" className=" absolute p-8 font-medium">
            Sign in
          </Link>
          <section className="w-1/2 flex flex-col justify-center items-center">
            <CardHeader className="text-center p-0 pb-2">
              <CardTitle> Create your account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 min-w-[26rem]">
              <Form {...form}>
                <form className="" onSubmit={form.handleSubmit(onSubmit)}>
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

                  <Button
                    disabled={signUpLoading}
                    type="submit"
                    className="w-full mt-3"
                  >
                    Create your account
                  </Button>
                </form>
              </Form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full" variant="outline">
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
          </section>
          <section className="w-1/2 bg-black ">
            <Image
              src="https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              width={1200}
              height={1200}
              priority
              alt="palm trees"
              className="object-cover h-full w-full"
            />
          </section>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
