import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import Loading from "./Loading";
import DeleteUser from "./components/DeleteUser";
import GetUserData from "./components/GetUserData";

export default function accountPage() {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-2">
      <CardTitle>Account</CardTitle>
      <div className="flex flex-col gap-5">
        <Suspense fallback={<Loading />}>
          <GetUserData />
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
    </div>
  );
}
