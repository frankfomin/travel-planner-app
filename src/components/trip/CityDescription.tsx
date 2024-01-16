import { saveTrip } from "@/lib/actions/saveTrip.action";
import axios from "axios";
import { headers } from "next/headers";
import React from "react";

async function getCityDescription() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/openai/cityDescription`,
    {
      headers: Object.fromEntries(headers()),
    }
  );
  console.log("data ", data);

  return data.description;
}

export default async function CityDescription({
  params,
  tripId,
}: {
  params: string | string[] | undefined;
  tripId: string;
}) {
  const description = await getCityDescription();

  if (!description) {
    throw new Error("description error");
  }

  return (
    <h2 className="sm:text-center text-muted-foreground">
      {description.responseText}
    </h2>
  );
}
