"use client"

import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  function handleSignInWithGoogle() {
    signIn("google");
  }

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session?.user?.email}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
