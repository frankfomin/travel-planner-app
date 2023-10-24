"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteUserForm({ userEmail }: { userEmail?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isEmailMatch, setIsEmailMatch] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === userEmail) {
      axios
        .delete("/api/deleteUser")
        .then(() => {
          toast.success("User deleted");
          signOut();
          router.push("/");
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later.");
        });
    } else {
      setError("Email does not match");
    }
  }

  useEffect(() => {
    if (email === userEmail) {
      setIsEmailMatch(true);
    } else {
      setIsEmailMatch(false);
    }
  }, [email, userEmail]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {isMounted ? (
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <Input name="email" onChange={(e) => setEmail(e.target.value)} />
            <span className="text-red-500">{error}</span>
            <div className="flex w-full gap-4 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={!isEmailMatch}
              >
                Delete
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}
