import { getCityLocationDesc } from "@/lib/actions/getLocationDesc";
import { getLocationDetails } from "@/lib/actions/getLocationDetails";
import Locations from "./Locations";
import { getCityLocations } from "@/lib/actions/getCityLocations";
import { getCityBias } from "@/lib/actions/getCityBias";
import { getCityDescription } from "@/lib/actions/getCityDescription";
import { Suspense } from "react";
import axios from "axios";
import { headers } from "next/headers";
import SaveTrip from "./SaveTrip";
import Loading from "./Loading";

async function getCachedTrip() {
  const { data } = await axios.get("http://localhost:3000/api/getCachedTrip", {
    headers: Object.fromEntries(headers()),
  });

  return data;
}

export default async function YourTrip() {
  const cachedTrip = await getCachedTrip();

  if (Array.isArray(cachedTrip) && cachedTrip.length > 0) {
    console.log("THERE IS A CACHED TRIP");
    return (
      <>
        <SaveTrip locations={cachedTrip} />
        <section className="flex flex-col ml-10 mt-10 gap-5">
          {cachedTrip.map((location: any, i: number) => (
            <Suspense key={i} fallback={<Loading />}>
              <Locations lat={0} lng={0} location={location} />
            </Suspense>
          ))}
        </section>
      </>
    );
  }

  const [locations, bias, cityDescription] = await Promise.all([
    getCityLocations(),
    getCityBias(),
    getCityDescription(),
  ]);

  return (
    <>
      <section className="flex flex-col gap-5">
        {locations.map((location, i) => (
          <Suspense key={i} fallback={<Loading />}>
            <Locations location={location} lat={bias?.lat} lng={bias?.lng} />
          </Suspense>
        ))}
      </section>
    </>
  );
}
