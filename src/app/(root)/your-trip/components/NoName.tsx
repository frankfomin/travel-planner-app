import { getCityBias } from "@/lib/actions/getCityBias";
import { getCityDescription } from "@/lib/actions/getCityDescription";
import { getCityLocations } from "@/lib/actions/getCityLocations";
import YourTrip from "./YourTrip";
import { Suspense } from "react";
import Loading from "./Loading";

export default async function NoName() {
  const [locations, bias, cityDescription] = await Promise.all([
    getCityLocations(),
    getCityBias(),
    getCityDescription(),
  ]);
  return (
    <Suspense fallback={<Loading />}>
      <YourTrip locations={locations} lat={bias.lat} lng={bias.lng} cityDescription={cityDescription} />
    </Suspense>
  );
}
