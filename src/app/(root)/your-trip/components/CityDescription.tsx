import { getCityDescription } from "@/lib/actions/city.action";
import { saveTrip } from "@/lib/actions/saveTrip.action";
import React from "react";

export default async function CityDescription({
  params,
  tripId,
}: {
  params: string | string[] | undefined;
  tripId: string;
}) {
  const description = await getCityDescription();

  if (!description.responseText) {
    throw new Error("description error");
  }

  if (params === "save") {
    await saveTrip({
      saveDescription: true,
      cityDescription: description.responseText,
      tripId,
    });
  }

  return (
    <h2 className="sm:text-center text-muted-foreground">
      {description.responseText}
    </h2>
  );
}
