import { Suspense } from "react";
import Locations from "./components/Locations";
import Loading from "./Loading";
import TripHeader from "./components/TripHeader";
import { Progress } from "@/components/ui/progress";

type Params = {
  params: {
    tripId: string;
  };
};

export default async function TripPage({ params }: Params) {
  return (
    <main className="">

      <TripHeader tripId={params.tripId} />
      <Suspense fallback={<Loading />}>
        <Locations tripId={params.tripId} />
      </Suspense>
    </main>
  );
}
