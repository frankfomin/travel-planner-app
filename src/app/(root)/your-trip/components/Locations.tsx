import { getCityLocationDesc } from "@/lib/actions/getLocationDesc";
import { getLocationDetails } from "@/lib/actions/getLocationDetails";
import LocationCard from "./LocationCard";
import axios from "axios";
import { Location, Place } from "@/lib/types";
import { headers } from "next/headers";
import { Suspense } from "react";
import SaveCachedTrip from "./SaveCachedTrip";

async function saveLocationData(
  locationDescription: string,
  locationDetails: Place
) {
  const { data } = await axios.post(
    "http://localhost:3000/api/saveLocationData",
    {
      locationDescription,
      locationDetails,
    },
    {
      headers: Object.fromEntries(headers()),
    }
  );

  return data;
}

async function getCachedTrip() {
  const { data } = await axios.get("http://localhost:3000/api/getCachedTrip", {
    headers: Object.fromEntries(headers()),
  });

  return data as Location[];
}

export default async function Locations({
  location,
  lat,
  lng,
}: {
  location: any;
  lat: number;
  lng: number;
}) {
 /*  const cachedTrip = await getCachedTrip();

  if (Array.isArray(cachedTrip) && cachedTrip.length > 0) {
    return (
      <>
        <LocationCard
          name={location.locationDetails.name}
          photos={location.locationDetails.photos}
          rating={location.locationDetails.rating}
          description={location.locationDescription}
        />
      </>
    );
  } */

  const [locationDescription, locationDetails] = await Promise.all([
    getCityLocationDesc(location),
    getLocationDetails({ location, lat, lng }),
  ]);

/*   await saveLocationData(locationDescription, locationDetails);
 */
  return (
    <>
      <h1>Not cached</h1>
      <LocationCard
        name={locationDetails.name}
        photos={locationDetails.photos}
        rating={locationDetails.rating}
        description={locationDescription}
      />
    </>
  );
}
