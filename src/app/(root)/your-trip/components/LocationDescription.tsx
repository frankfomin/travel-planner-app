import { getLocationDescription } from "@/lib/actions/location.actions";
import React from "react";

export default async function LocationDescription({
  locationName,
  locationCount,
}: {
  locationName: string;
  locationCount: number;
}) {
  const res = await getLocationDescription({
    locationName,
    locationCount,
  });

  if (!res.description) {
    throw new Error("No description found");
  }
  return <p className=" text-muted-foreground">{res.description}</p>;
}
