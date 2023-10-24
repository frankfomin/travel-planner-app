"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { TsignInSchema, signInSchema } from "@/lib/types";
import { TsignUpSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";

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
import { Icons } from "@/components/ui/icons";

export default function SignInForm({ styles }: { styles?: string }) {
  const session = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          console.log("error");
        }
        if (callback?.ok && !callback?.error) {
          console.log("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signInSchema),
  });

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
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("finally");
      });
  }
  return (
    <>
      {isMounted ? (
        <section className="">
          <Card className={`min-w-[20rem] ${styles}`}>
            <CardHeader>
              <CardTitle> Create your account</CardTitle>
              <CardDescription>
                Don&apos;t have an account? Sign up
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  color="secondary"
                >
                  {isLoading && <Spinner size="lg" color="primary" />}
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => googleSignIn()}
                  variant="outline"
                >
                  {isLoading && <Spinner size="lg" color="white" />}
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
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

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full mt-3"
                  >
                    Create your account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
