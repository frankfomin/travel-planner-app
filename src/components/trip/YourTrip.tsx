import { Suspense } from "react";

import TripHeader from "@/components/shared/TripHeader";
import CityDescription from "./CityDescription";
import LocationCard from "../cards/LocationCard";
import { getCityBias, getCityLocations } from "@/lib/actions/city.actions";
import Loading from "../loading/CardLoading";
import CityDescLoading from "../loading/CityDescLoading";
import CityPictureLoading from "../loading/CityPictureLoading";
import SaveBtn from "../(trip components)/saveBtn";

export default async function YourTrip({
  params,
  tripId,
}: {
  params: string | string[] | undefined;
  tripId: string;
}) {
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

  console.log("LENGTH ",locations.cityLocations.length);

  return (
    <>
      <SaveBtn />
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
      <section className="flex flex-col gap-5 sm:ml-10 sm:mt-10 mt-5 ">
        {locations.cityLocations.map((location: string, i) => (
          <Suspense key={i} fallback={<Loading />}>
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
      </section>
    </>
  );
}
