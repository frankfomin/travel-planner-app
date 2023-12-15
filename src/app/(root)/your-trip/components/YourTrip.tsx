import { Suspense } from "react";

import TripHeader from "@/components/shared/TripHeader";
import CityDescription from "./CityDescription";
import LocationCard from "./LocationCard";
import { getCityBias, getCityLocations } from "@/lib/actions/city.action";
import Loading from "./Loading/CardLoading";
import CityDescLoading from "./Loading/CityDescLoading";
import CityPictureLoading from "./Loading/CityPictureLoading";

export default async function YourTrip() {
  const [locations, bias] = await Promise.all([
    getCityLocations(),
    getCityBias(),
  ]);

  if (locations.rateLimit || bias.rateLimit) {
    throw new Error("Rate limit exceeded");
  }

  if (!locations.cityLocations || !bias.lat || !bias.lng) {
    throw new Error("Failed to load data");
  }

  return (
    <>
      <header className="relative w-full flex flex-col items-center gap-10">
        <div className="max-w-4xl">
          <Suspense fallback={<CityPictureLoading />}>
            <TripHeader />
          </Suspense>
          <Suspense fallback={<CityDescLoading />}>
            <CityDescription />
          </Suspense>
        </div>
      </header>
      <section className="flex flex-col gap-5 ml-10 mt-10 ">
        {locations.cityLocations.map((location: string, i) => (
          <Suspense key={i} fallback={<Loading />}>
            <LocationCard
              key={i}
              location={location}
              lat={bias.lat}
              lng={bias.lng}
            />
          </Suspense>
        ))}
      </section>
    </>
  );
}
