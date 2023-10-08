import LocationCard from "@/components/LocationCard";
import SaveTrip from "@/components/ui/SaveTrip";
import { Place } from "@/lib/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function getCachedTrip(params: string) {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/getCachedTrip/${params}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

type Params = {
  params: {
    tripId: string;
  };
};

export default async function YourTrip({ params }: Params) {
  console.log(params.tripId);
  const data = await getCachedTrip(params.tripId);

  //how to retrieve data from the url i need to get the trip id after the http://localhost:3000/your-trip/${tripId} server side please

  return (
    <main className="flex flex-col">
      <SaveTrip locations={data} />
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
