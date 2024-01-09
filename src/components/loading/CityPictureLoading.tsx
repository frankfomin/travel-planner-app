import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CityPictureLoading() {
  return (
    <section className="flex justify-center items-center">
      <Skeleton className="aspect-video object-cover min-w-[56rem] rounded-md w-full h-full " />
    </section>
  );
}
