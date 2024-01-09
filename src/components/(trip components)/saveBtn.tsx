import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function SaveBtn() {
  return (
    <Link
      href={{
        pathname: "/your-trip",
        query: { action: "save" },
      }}
      shallow={true}
    >
      <Button>Save trip</Button>
    </Link>
  );
}
