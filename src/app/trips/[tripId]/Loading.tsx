import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="flex flex-col gap-5 max-w-2xl px-4 py-5 shadow-lg"
        >
          <CardTitle>
            <Skeleton className="h-6 w-[45%]" />
          </CardTitle>
          <CardContent className="p-0 flex flex-col gap-5">
            <Skeleton className="aspect-video " />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[96%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
