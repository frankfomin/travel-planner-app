"use client";

import { DropdownMenuItem } from "../dropdown-menu";
import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

async function handleSignOut() {
  const res = await axios
    .get("/api/signOut", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => signOut())
    .catch(() => toast.error("Error signing out"));
}

export default function NavSignOut() {
  return (
    <DropdownMenuItem className=" hover:cursor-pointer" onClick={handleSignOut}>
      Sign out
    </DropdownMenuItem>
  );
}
