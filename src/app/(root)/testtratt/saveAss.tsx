"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";

export default function SaveAss() {
  const router = useRouter();

  const handleClick = () => {
    router.push("?action=save", undefined, { shallow: true });
  };

  return <Button onClick={handleClick}>Save trip</Button>;
}
