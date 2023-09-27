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
import { CardFooter } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function SignUpPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: TsignUpSchema) => {
    signUp(data);
    console.log("SIGNUPRES", signUpRes);
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
  });

  if (status === "success") {
    router.push("/");
  }

  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <>
      {isMounted ? (
        <main className="">
          <ModeToggle />
          <Card className=" max-w-sm">
            <CardHeader>
              <CardTitle> Create your account</CardTitle>
              <CardDescription>
                Already have an account? Sign in{" "}
              </CardDescription>
              <CardDescription className=" text-red-500">
                {status === "error"
                  ? "Email is invalid or has already been taken"
                  : null}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline">
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
                  <Button
                    disabled={signUpLoading}
                    type="submit"
                    className="w-full mt-3"
                  >
                    Create your account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      ) : (
        ""
      )}
    </>
  );
}

/* "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { contactSchema, TcontactSchema } from "@/lib/types";
import { useEffect, useState } from "react";
import Footer2 from "@/components/Footer2";

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TcontactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: TcontactSchema) => {
    console.log("HALLÅ");
    const res = await fetch("/api/contactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        services: data.services,
        message: data.message,
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      alert("Submitting form failed!");
      return;
    }

    if (resData.errors) {
      const errors = resData.errors;

      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      } else if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.services) {
        setError("services", {
          type: "server",
          message: errors.services,
        });
      } else if (errors.message) {
        setError("message", {
          type: "server",
          message: errors.message,
        });
      } else {
        alert("something went wrong");
      }
    } else {
      reset();
    }
  };
  return (
    <>
      {isMounted ? (
        <main className="uppercase flex items-center flex-col gap-24 mt-24">
          <section className=" font-playfair font-normal text-9xl flex justify-center">
            <div className=" flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h1>Låt</h1>
                <Image
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  width={100}
                  height={100}
                  alt="cool image"
                  className="aspect-[1.5/1] w-52 object-cover rounded-xl"
                />
                <h2>Oss</h2>
              </div>
              <div className=" mt-4 font-montserrat font-normal opacity-60 text-4xl flex justify-between px-[5.6rem] items-center">
                <span>{`63°49'44.002"N`}</span>
                <span>{`20°15'25.268"E`}</span>
              </div>
              <div>Samarbeta</div>
            </div>
          </section>
          <div className=" p-[0.05px] bg-white w-[60%]" />
          <section>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className=" relative flex flex-col justify-center">
                    <input
                      {...register("name")}
                      placeholder="Name"
                      className="peer transition-all placeholder:text-transparent py-3 px-4 text-xl
                  [&:not(:placeholder-shown)]:pb-1 [&:not(:placeholder-shown)]:pt-5 bg-transparent 
                  border rounded-xl outline-none "
                      type="text"
                    />

                    <label className="absolute py-3 px-4  peer-placeholder-shown:translate-y-0 -translate-y-3 peer-placeholder-shown:text-xl text-sm  pointer-events-none transition-all ease-motion ">
                      Ditt Namn
                    </label>
                    {errors.name && (
                      <p className=" text-red-500">{`${errors.name.message}`}</p>
                    )}
                  </div>
                  <div className=" relative flex items-center">
                    <input
                      {...register("email")}
                      placeholder="Email"
                      className="peer transition-all placeholder:text-transparent py-3 px-4 text-xl
                  [&:not(:placeholder-shown)]:pb-1 [&:not(:placeholder-shown)]:pt-5 bg-transparent 
                  border rounded-xl outline-none "
                      type="text"
                    />
                    <label className="absolute py-3 px-4  peer-placeholder-shown:translate-y-0 -translate-y-3 peer-placeholder-shown:text-xl text-sm  pointer-events-none transition-all ease-motion ">
                      Din mail
                    </label>
                    {errors.email && (
                      <p className=" text-red-500">{`${errors.email.message}`}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center border rounded-xl px-4 py-3">
                  <label className="  text-xl  pointer-events-none transition-all ease-motion  ">
                    Vilka tjänster söker du?
                  </label>
                  <input
                    {...register("services")}
                    placeholder="PRODUKTFOTO, REKLAMFILMER..."
                    className="text-xl bg-transparent outline-none w-full"
                    type="text"
                  />
                  {errors.services && <p>{`${errors.services.message}`}</p>}
                </div>
                <div className="flex flex-col justify-center border rounded-xl px-4 py-3 pb-20  ">
                  <label className="  text-xl  pointer-events-none transition-all ease-motion  ">
                    Ditt Meddelande
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="HEJ ADAM, KAN DU HJÄLPA MIG MED..."
                    className="text-xl bg-transparent outline-none box-border resize-none"
                  />
                  {errors.message && (
                    <p>{`ERROR: ${errors.message.message}`}</p>
                  )}
                </div>
                   <Button>Skicka</Button>
                <div className="flex justify-center"></div>
              </div>
            </form>
          </section>
        </main>
      ) : (
        ""
      )}
    </>
  );
}
 */
