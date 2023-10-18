import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateEmailForm from "./components/UpdateEmailForm";
import { Suspense } from "react";
import UpdateUserEmail from "./components/UpdateUserEmail";
import Loading from "./Loading";
import DeleteUser from "./components/DeleteUser";

export default function ProfilePage() {
  return (
    <main className="flex justify-center gap-32 mt-20">
      <section className="flex flex-col gap-3">
        <Link href="/profile/account">Account</Link>
        <Link href="/profile/security">Security</Link>
      </section>
      <section className="w-full max-w-3xl flex flex-col gap-2">
        <h1 className="text-6xl">Account</h1>
        <div className="flex flex-col gap-5">
          <Suspense fallback={<Loading />}>
            <UpdateUserEmail />
          </Suspense>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="p-0">Delete account</CardTitle>

                <div className="flex justify-between items-end">
                  <CardDescription>
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </CardDescription>
                  <Suspense>
                    <DeleteUser />
                  </Suspense>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
