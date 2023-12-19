import { getTripLocations } from "@/lib/actions/trips.action";
import { Photo, Place } from "@/types";
import LocationCard from "./LocationCard";

export default async function Locations({ tripId }: { tripId: string }) {
  const locations = await getTripLocations(tripId);

  return (
    <section className="flex flex-col gap-5 ml-10 mt-10 ">
      {locations?.locations.map((location, i) => (
        <LocationCard
          key={i}
          name={location.name}
          description={location.description ?? ""}
          rating={location.rating ?? ""}
          photos={location.photos as Photo}
          reviews={location.reviews}
        />
      ))}
    </section>
  );
}
