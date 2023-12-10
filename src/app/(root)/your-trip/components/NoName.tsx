import YourTrip from "./YourTrip";
import { Suspense } from "react";
import Loading from "./Loading";
import {
  getCityBias,
  getCityDescription,
  getCityLocations,
} from "@/lib/actions/city.action";

export default async function NoName() {
  const [locations, bias, cityDescription] = await Promise.all([
    getCityLocations(),
    getCityBias(),
    getCityDescription(),
  ]);

  if (locations.rateLimit) {
    throw new Error("Rate limit exceeded");
  }

  if (
    !locations.cityLocations ||
    !bias.lat ||
    !bias.lng ||
    !cityDescription.responseText
  ) {
    throw new Error("Failed to load data");
  }

  return (
    <Suspense fallback={<Loading />}>
      <YourTrip
        locations={locations.cityLocations}
        lat={bias.lat}
        lng={bias.lat}
        cityDescription={cityDescription.responseText}
      />
    </Suspense>
  );
}
