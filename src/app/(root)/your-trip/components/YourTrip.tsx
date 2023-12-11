import TripHeader from "@/components/shared/TripHeader";
import LocationCard from "./LocationCard";
import SaveTrip from "./SaveTrip";
import {
  getLocationDescription,
  getLocationDetails,
} from "@/lib/actions/location.action";
import { Details, Place } from "@/types";

export default async function YourTrip({
  locations,
  lat,
  lng,
  cityDescription,
}: {
  locations: string[];
  lat: number;
  lng: number;
  cityDescription: string;
}) {
  const details: any = await Promise.all(
    locations?.map(async (location) => {
      const { details } = await getLocationDetails({ location, lat, lng });
      const { description } = await getLocationDescription(location);
      return { ...details, description };
    })
  );

  console.log(details);
  return (
    <main>
      <SaveTrip locations={details} cityDescription={cityDescription} />
      <TripHeader cityDescription={cityDescription} />
      <section className="flex flex-col gap-5 ml-10 mt-10 ">
        {details.map((detail: Place, i: number) => (
          <>
            <LocationCard
              key={i}
              name={detail.name}
              photos={detail.photos}
              description={detail.description}
              reviews={detail.reviews}
            />
          </>
        ))}
      </section>
    </main>
  );
}
