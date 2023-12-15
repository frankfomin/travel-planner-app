import { getLocationDescription } from "@/lib/actions/location.action";
import React from "react";

export default async function LocationDescription({
  locationName,
}: {
  locationName: string;
}) {
  const res = await getLocationDescription(locationName);

  if (!res.description) {
    throw new Error("No description found");
  }
  return <p className=" text-muted-foreground">{res.description}</p>;
}
