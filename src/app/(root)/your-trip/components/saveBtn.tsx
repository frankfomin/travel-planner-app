import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function SaveBtn() {
  return (
    <Link href="/your-trip?action=save">
      <Button>Save trip</Button>
    </Link>
  );
}
