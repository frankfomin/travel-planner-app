import { Suspense } from "react";
import Locations from "./components/Locations";
import Loading from "./Loading";
import TripHeader from "@/components/shared/TripHeader";

type Params = {
  params: {
    tripId: string;
  };
};

export default async function TripPage({ params }: Params) {
  return (
    <main className="">
      <TripHeader />
      <Suspense fallback={<Loading />}>
        <Locations tripId={params.tripId} />
      </Suspense>
    </main>
  );
}
