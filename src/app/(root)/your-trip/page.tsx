import { Suspense } from "react";
import YourTrip from "./components/YourTrip";
import SaveTrip from "./components/SaveCachedTrip";
import NoName from "./components/NoName";
import Loading from "./Loading";

export default function YourTripPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <NoName />
      </Suspense>
    </main>
  );
}
