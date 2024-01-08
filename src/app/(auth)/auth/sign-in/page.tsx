import { auth } from "@/auth";
import SignInForm from "@/components/auth/forms/SignInForm";

export default async function SignInPage() {
  const session = await auth();
  return (
    <>
      {JSON.stringify(session?.user)}
      <SignInForm />
    </>

  )
}
