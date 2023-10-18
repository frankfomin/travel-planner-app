"use client"

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../dropdown-menu";

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
