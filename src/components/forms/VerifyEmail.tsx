"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");
  const router = useRouter();

  if (!token) {
    throw new Error("No token provided");
  }

  async function onSubmit() {
    if (token) {
      setIsLoading(true);
      const { success, error } = await verifyEmail(token);
      setIsLoading(false);

      if (success) {
        toast.success("Email verified");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 1000);
      } else {
        toast.error("Could not verify email");
      }
    }
  }

  return (
    <div className="grid gap-4">
      <Button onClick={onSubmit}>Verify your email here</Button>
    </div>
  );
}
