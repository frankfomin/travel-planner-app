import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { ExtendedSession } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteUserForm from "@/components/forms/DeleteUserForm";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }
  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      <section className="flex gap-4 items-center">
        {session.user?.image ? (
          <Image
            src={session.user?.image || ""}
            width={100}
            height={100}
            alt="user image"
            className=" rounded-full w-10 h-10"
          />
        ) : (
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        <div>
          <h2 className="text-xl font-bold">{session.user?.name}</h2>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </div>
      </section>
      <div className="flex flex-col gap-5">
        <section>
          <UpdateUserForm user={session.user as ExtendedSession} />
        </section>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="p-0">Delete account</CardTitle>
              <div className="flex justify-between">
                <CardDescription className=" max-w-xs">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete account</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete your account?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogDescription>
                      Enter <Badge variant="destructive">DELETE</Badge>{" "}
                      downbelow to delete your account to confirm.
                    </DialogDescription>
                    <DeleteUserForm userId={session.user?.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
