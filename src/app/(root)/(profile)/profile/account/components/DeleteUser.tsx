import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteUserForm from "./DeleteUserForm";
import { headers } from "next/headers";
import axios from "axios";

async function getSession() {
  const response = await axios
    .get("http://localhost:3000/api/getSession", {
      headers: Object.fromEntries(headers()),
    })
    .catch((err) => {
      console.log(err);
    });

  if (response && response.data) {
    return response.data;
  }
}

export default async function DeleteUser() {
  const user = await getSession();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className=" w-full max-w-[10rem]">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account?
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>
          Enter your email address{" "}
          <span className="font-semibold dark:text-primary-foreground text-secondary-foreground">
            {user.email}
          </span>{" "}
          to confirm.
        </DialogDescription>
        <DeleteUserForm userEmail={user.email} />
      </DialogContent>
    </Dialog>
  );
}
