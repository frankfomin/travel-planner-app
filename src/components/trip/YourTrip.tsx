import { Suspense } from "react";

import TripHeader from "@/components/shared/TripHeader";
import CityDescription from "./CityDescription";
import LocationCard from "../cards/LocationCard";
import CityDescLoading from "../loading/CityDescLoading";
import CityPictureLoading from "../loading/CityPictureLoading";
import SaveBtn from "../(trip components)/saveBtn";
import { auth } from "@/auth";
import { ExtendedSession } from "@/types";
import TripMap from "./TripMap";
import CardLoading from "../loading/CardLoading";
import axios from "axios";
import { headers } from "next/headers";

async function getCityLocations() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/openai/locations/cityLocations`,
    {
      method: "GET",
      headers: Object.fromEntries(headers()),
    }
  );

  const data = await response.json();

  return data.locations;
}

async function getCityBias() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/google/cityBias`,
    {
      method: "GET",
      headers: Object.fromEntries(headers()),
    }
  );

  const data = await response.json();

  return { lat: data.lat, lng: data.lng };
}

export default async function YourTrip() {
  const [locations, bias, session] = await Promise.all([
    getCityLocations(),
    getCityBias(),
    auth(),
  ]);

  if (!locations || !bias.lat || !bias.lng) {
    throw new Error("Failed to load data");
  }
  const length = locations.length;
  return (
    <main className="flex flex-col gap-5">
      <SaveBtn length={length} user={session?.user as ExtendedSession} />
      <header className="relative w-full flex flex-col items-center gap-10">
        <div className="sm:max-w-4xl ">
          <Suspense fallback={<CityPictureLoading />}>
            <TripHeader />
          </Suspense>
          <Suspense fallback={<CityDescLoading />}>
            <CityDescription />
          </Suspense>
        </div>
      </header>
      <section className="flex justify-between">
        <div className="flex flex-col gap-5 sm:w-[50%]">
          {locations.map((location: string, i: number) => (
            <Suspense key={i} fallback={<CardLoading />}>
              <LocationCard
                key={i}
                locationCount={i}
                location={location}
                lat={bias.lat}
                lng={bias.lng}
              />
            </Suspense>
          ))}
        </div>
        <TripMap lat={bias.lat} lng={bias.lng} locations={locations} />
      </section>
    </main>
  );
}
