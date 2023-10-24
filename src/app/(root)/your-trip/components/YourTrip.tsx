import { useState, useEffect } from "react";
import { getCityLocationDesc } from "@/lib/actions/getLocationDesc";
import { getLocationDetails } from "@/lib/actions/getLocationDetails";
import Locations from "./Locations";
import Loading from "./Loading";
import TripHeader from "@/components/shared/TripHeader";
import LocationCard from "./LocationCard";
import { Place } from "@/lib/types";
import SaveTrip from "./SaveTrip";

export default async function YourTrip({
  locations,
  lat,
  lng,
}: {
  locations: string[];
  lat: number;
  lng: number;
}) {
  const details: Place[] = await Promise.all(
    locations?.map(async (location) => {
      const locationDetails = await getLocationDetails({ location, lat, lng });
      const locationDescription = await getCityLocationDesc(location);
      return { ...locationDetails, locationDescription };
    })
  );

  return (
    <main>
      <SaveTrip locations={details} />
      <TripHeader />
      <section className="flex flex-col gap-5 ml-10 mt-10 ">
        {details.map((detail: Place, i) => (
          <LocationCard
            key={i}
            name={detail.name}
            photos={detail.photos}
            description={detail.locationDescription}
          />
        ))}
      </section>
    </main>
  );
}
