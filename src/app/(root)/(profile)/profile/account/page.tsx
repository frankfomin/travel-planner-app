import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import Loading from "./Loading";
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  return (
    <div className="w-full max-w-3xl flex flex-col gap-2">
      <CardTitle>Account</CardTitle>
      <div className="flex flex-col gap-5">
        <section>
          {/* form to see email, add a name or show name,
            * change password, delete account
       
          */}
          
        </section>
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
                  {/*                   <DeleteUser />
                   */}{" "}
                </Suspense>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
