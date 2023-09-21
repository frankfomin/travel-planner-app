"use client";

import { NextUIProvider as Next } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Next>{children}</Next>;
}
