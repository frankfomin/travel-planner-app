import { getCityDescription } from "@/lib/actions/city.action";
import React from "react";

export default async function CityDescription() {
  const description = await getCityDescription();
  return <h2 className="text-cennter text-muted-foreground">{description.responseText}</h2>;
}
