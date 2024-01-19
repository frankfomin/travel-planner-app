"use client";

import { DropdownMenuItem } from "../dropdown-menu";
import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function NavSignOut() {
  return (
    <DropdownMenuItem
      className=" hover:cursor-pointer"
      onClick={() => signOut()}
    >
      Sign out
    </DropdownMenuItem>
  );
}
