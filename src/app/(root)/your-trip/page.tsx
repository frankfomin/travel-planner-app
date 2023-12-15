import { getCityBias, getCityLocations } from "@/lib/actions/city.action";
import YourTrip from "./components/YourTrip";
import { Suspense } from "react";
import Loading from "./Loading";

export default async function YourTripPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <YourTrip />
      </Suspense>
    </main>
  );
}
