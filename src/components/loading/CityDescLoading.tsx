import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CityDescLoading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[95%]" />
      <Skeleton className="h-4 w-[95%]" />
    </div>
  );
}
