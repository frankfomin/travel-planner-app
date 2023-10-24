import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center gap-32 mt-20">
      <section className="flex flex-col gap-3">
        <Link href="/profile/account">Account</Link>
        <Link href="/profile/security-log">Security</Link>
      </section>
      <section>{children}</section>
    </main>
  );
}
