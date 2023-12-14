import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getServerSession } from "next-auth";
import Link from "next/link";
import NavSignOut from "./NavSignOut";
import { Button } from "../button";
import { config } from "../../../lib/auth";

export default async function NavDropDown() {
  const session = await getServerSession(config);

  return (
    <>
      {!session ? (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile/account">
              <DropdownMenuItem className=" hover:cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/trips">
              <DropdownMenuItem className=" hover:cursor-pointer">
                Trips
              </DropdownMenuItem>
            </Link>
            <NavSignOut />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
