"use client"

import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function User() {
  const session = useSession();
  return (
    <div>
      {session ? (
        session.data?.user?.email
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}
    </div>
  );
}
