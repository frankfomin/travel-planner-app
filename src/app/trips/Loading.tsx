import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import SkeletonLoader from "./components/Skeleton";

export default function Loading() {
  return (
    <SkeletonLoader />
  );
}
