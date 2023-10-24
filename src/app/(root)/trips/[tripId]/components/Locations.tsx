import LocationCard from "@/app/(root)/your-trip/components/LocationCard";
import { options } from "@/app/api/auth/[...nextauth]/options";
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
    <section className="flex flex-col gap-5 ml-10 mt-10 ">
      {tripLocations.map((location: Place, i) => (
        <LocationCard
          key={i}
          name={location.name}
          description={location.description}
          rating={location.rating}
          photos={location.photos}
        />
      ))}
    </section>
  );
}
