"use client";

import React from "react";
import { Icons } from "../ui/icons";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import SubmitButton from "../ui/SubmitButton";

export default function Socials() {
  const [isLoading, setIsLoading] = React.useState(false);
  function oAuthSignIn() {
    setIsLoading(true);
    signIn("google").catch(() => {
      toast.error("Error signing in with Google");
    });
    setIsLoading(false);
  }
  return (
    <form action={oAuthSignIn} className=" grid gap-4">
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
        <SubmitButton outline={true} isLoading={isLoading}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </SubmitButton>
      </div>
    </form>
  );
}
