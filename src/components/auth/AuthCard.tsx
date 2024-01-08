import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Socials from "./Socials";

export default function AuthCard({
  children,
  title,
  description,
  linkText,
  href,
  showSocials = true,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  linkText?: string;
  href?: string;
  showSocials?: boolean;
}) {
  return (
    <Card className=" border-none flex flex-col items-center">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}{" "}
          {href && (
            <Link className=" text-primary" href={href}>
              {linkText}
            </Link>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 min-w-[26rem]">
        {children}
        {showSocials && <Socials />}
      </CardContent>
    </Card>
  );
}
