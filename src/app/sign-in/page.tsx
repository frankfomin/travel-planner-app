"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { TsignInSchema, signInSchema } from "@/lib/types";
import { TsignUpSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function SingInPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: TsignInSchema) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback.error);
        } else if (callback?.ok) {
          router.push("/");
          console.log("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signInSchema),
  });

  function googleSignIn() {
    setIsLoading(true);
    signIn("google", { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback.error);
        } else if (callback?.ok) {
          router.push("/");
          console.log("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <>
      {isMounted ? (
        <main className="">
          <Card className=" max-w-sm">
            <CardHeader>
              <CardTitle> Create your account</CardTitle>
              <CardDescription>
                Don&apos;t have an account? Sign up{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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

                  <Button type="submit" className="w-full mt-3">
                    Create your account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Button disabled={isLoading} onClick={() => googleSignIn}>
            SIGN IN WITH GOOGLE
          </Button>
          <div>
            {session ? `signed in as ${session.user?.email} ` : "Not signed in"}
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
