"use client";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { DialogClose } from "@radix-ui/react-dialog";
import { ExtendedSession } from "@/types";
import SignInForm from "../forms/SignInForm";
import SaveTripForm from "../forms/SaveTripForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignUpForm from "../forms/SignUpForm";

export default function saveBtn({
  user,
  length,
}: {
  user: ExtendedSession | undefined;
  length: number;
}) {
  console.log(user?.id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save trip</Button>
      </DialogTrigger>
      <DialogContent>
        {user ? (
          <DialogHeader>
            <DialogTitle>Save your trip</DialogTitle>
            <DialogDescription>Give your trip a name</DialogDescription>
            <SaveTripForm length={length} />
          </DialogHeader>
        ) : (
          <DialogHeader>
            <SignInForm
              href="/auth/sign-up?redirect=your-trip"
              redirectUrl="/your-trip"
            />
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
