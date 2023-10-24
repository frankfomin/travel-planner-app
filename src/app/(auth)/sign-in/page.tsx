"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SignInPage() {
  const [isMounted, setIsMounted] = useState(false);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (data: TsignUpSchema) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid email or password");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/");
      });
  };

  function googleSignIn() {
    console.log("google sign in");
    setIsLoading(true);
    signIn("google", { redirect: false })
      .then((callback) => {
        console.log(callback);
        if (callback?.error) {
          console.log(callback.error);
          console.log("error");
        }
        if (callback?.ok && !callback?.error) {
          console.log("Logged in");
          router.push("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <>
      {isMounted ? (
        <main className="flex h-screen">
          <section className="w-1/2 flex flex-col justify-center items-center">
            <CardTitle>Sign into your account</CardTitle>
            <CardDescription>
              New to Venturevista?{" "}
              <Link href="/sign-up">Sign up for an account</Link>
            </CardDescription>
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
                    disabled={isLoading}
                    type="submit"
                    className="w-full mt-3"
                  >
                    Sign in
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
                <Button
                  disabled={isLoading}
                  onClick={googleSignIn}
                  className="w-full"
                  variant="outline"
                >
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
