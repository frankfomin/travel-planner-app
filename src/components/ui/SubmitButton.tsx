"use client";

import { Button } from "./button";
import { Icons } from "./icons";

export default function SubmitButton({
  isLoading,
  children,
  outline = false,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <Button
      variant={outline ? "outline" : "default"}
      disabled={isLoading}
      className="w-full flex gap-4"
      type="submit"
    >
      <div className="flex items-center">{children}</div>
      {isLoading && <Icons.spinner className="animate-spin" />}
    </Button>
  );
}
