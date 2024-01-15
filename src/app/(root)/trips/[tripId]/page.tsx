import { Suspense } from "react";
import Locations from "./components/Locations";
import Loading from "./Loading";
import TripHeader from "./components/TripHeader";
import { Progress } from "@/components/ui/progress";
import { getTripLocations } from "@/lib/actions/trips.action";

type Params = {
  params: {
    tripId: string;
  };
};

export default async function TripPage({ params }: Params) {
  const locations = await getTripLocations(params.tripId);

  return (
    <main className="">
      <TripHeader trip={locations?.locations[0].trip} />
      <Suspense fallback={<Loading />}>
        <Locations locations={locations?.locations ?? []} />
      </Suspense>
    </main>
  );
}
