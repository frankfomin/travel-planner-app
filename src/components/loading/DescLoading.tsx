import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function DescLoading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[92%]" />
      <Skeleton className="h-4 w-[87%]" />
      <Skeleton className="h-4 w-[92%]" />
    </div>
  );
}
