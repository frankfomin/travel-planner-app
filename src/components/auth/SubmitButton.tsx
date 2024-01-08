"use client";

import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export default function SubmitButton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button disabled={isLoading} className="w-full flex gap-4" type="submit">
      <p>{children}</p>
      {isLoading && <Icons.spinner className="animate-spin" />}
    </Button>
  );
}
