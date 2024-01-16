import { saveTrip } from "@/lib/actions/saveTrip.action";
import axios from "axios";
import { headers } from "next/headers";
import React from "react";

async function getCityDescription() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/openai/descriptions/cityDescription`,
    {
      headers: Object.fromEntries(headers()),
    }
  );

  return data.description;
}

export default async function CityDescription() {
  const description = await getCityDescription();

  if (!description) {
    throw new Error("description error");
  }

  return (
    <h2 className="sm:text-center text-muted-foreground">{description}</h2>
  );
}
