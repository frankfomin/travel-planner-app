import { Suspense } from "react";
import Locations from "./components/Locations";
import Loading from "./Loading";

type Params = {
  params: {
    tripId: string;
  };
};

export default async function TripPage({ params }: Params) {
  return (
    <Suspense fallback={<Loading />}>
      <Locations tripId={params.tripId} />
    </Suspense>
  );
}
