import VerifyEmail from "@/components/forms/VerifyEmail";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}
