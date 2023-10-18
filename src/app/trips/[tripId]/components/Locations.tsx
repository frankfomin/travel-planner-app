import { options } from "@/app/api/auth/[...nextauth]/options";
import LocationCard from "@/app/your-trip/components/LocationCard";
import { Place } from "@/lib/types";
import axios from "axios";
import { headers } from "next/headers";

async function getTripLocations(params: string) {
  const { data } = await axios.post(
    "http://localhost:3000/api/getTripLocations",
    { tripId: params },
    { headers: Object.fromEntries(headers()) }
  );
  return data as Place[];
}

export default async function Locations({ tripId }: { tripId: string }) {
  const tripLocations = await getTripLocations(tripId);
  

  return (
    <>
      {tripLocations.map((location: Place, i) => (
        <LocationCard
          key={i}
          name={location.name}
          description={location.description}
          rating={location.rating}
          photos={location.photos}
        />
      ))}
    </>
  );
}
