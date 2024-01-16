import { Suspense } from "react";

import TripHeader from "@/components/shared/TripHeader";
import CityDescription from "./CityDescription";
import LocationCard from "../cards/LocationCard";
import { getCityBias, getCityLocations } from "@/lib/actions/city.actions";
import CityDescLoading from "../loading/CityDescLoading";
import CityPictureLoading from "../loading/CityPictureLoading";
import SaveBtn from "../(trip components)/saveBtn";
import { auth } from "@/auth";
import { ExtendedSession } from "@/types";
import TripMap from "./TripMap";
import CardLoading from "../loading/CardLoading";

export default async function YourTrip({
  params,
  tripId,
}: {
  params: string | string[] | undefined;
  tripId: string;
}) {
  const [locations, bias, session] = await Promise.all([
    getCityLocations(),
    getCityBias(),
    auth(),
  ]);

  if (locations.rateLimit || bias.rateLimit) {
    throw new Error("Rate limit exceeded");
  }

  if (!locations.cityLocations || !bias.lat || !bias.lng) {
    throw new Error("Failed to load data");
  }
  const length = locations.cityLocations.length;
  return (
    <main className="flex flex-col gap-5">
      <SaveBtn length={length} user={session?.user as ExtendedSession} />
      <header className="relative w-full flex flex-col items-center gap-10">
        <div className="sm:max-w-4xl ">
          <Suspense fallback={<CityPictureLoading />}>
            <TripHeader tripId={tripId} params={params} />
          </Suspense>
          <Suspense fallback={<CityDescLoading />}>
            <CityDescription tripId={tripId} params={params} />
          </Suspense>
        </div>
      </header>
      <section className="flex justify-between">
        <div className="flex flex-col gap-5 sm:w-[50%]">
          {locations.cityLocations.map((location: string, i) => (
            <Suspense key={i} fallback={<CardLoading />}>
              <LocationCard
                tripId={tripId}
                key={i}
                locationCount={i}
                params={params}
                location={location}
                lat={bias.lat}
                lng={bias.lng}
              />
            </Suspense>
          ))}
        </div>
        <TripMap
          lat={bias.lat}
          lng={bias.lng}
          locations={locations.cityLocations}
        />
      </section>
    </main>
  );
}
