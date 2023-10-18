import { Suspense } from "react";
import YourTrip from "./components/YourTrip";
import SaveTrip from "./components/SaveCachedTrip";

export default function YourTripPage() {
  return (
    <main>
      <Suspense fallback={<div className="text-9xl">Loading...</div>}>
        <YourTrip />
      </Suspense>
    </main>
  );
}
