import LocationCard from "@/app/your-trip/components/LocationCard";
import { Place } from "@/lib/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import SaveTrip from "../your-trip/components/SaveCachedTrip";

async function getCachedTrip() {
  const { data } = await axios.get("http://localhost:3000/api/getCachedTrip", {
    headers: Object.fromEntries(headers()),
  });
  return data;
}

type Params = {
  params: {
    tripId: string;
  };
};

export default async function YourTrip() {
  const data = await getCachedTrip();

  return (
    <main className="flex flex-col">
      {/*       <SaveTrip locations={data} />
       */}{" "}
      <div className="flex flex-col gap-5">
        {data?.map((loc: Place, i: number) => (
          <LocationCard
            key={i}
            cityLoc={loc.name}
            name={loc.name}
            photos={loc.photos}
            rating={loc.rating}
            description={loc.description}
          />
        ))}
      </div>
    </main>
  );
}
