import YourTrip from "../../../components/trip/YourTrip";
import { Suspense } from "react";
import { db } from "@/db/db";
import { location, trip } from "@/db/schema";
import { nanoid } from "nanoid";
import Loading from "@/components/loading/Loading";

export const runtime = "edge";

export default async function YourTripPage() {
  return (
    <main className="p-3">
      <Suspense fallback={<Loading />}>
        <YourTrip />
      </Suspense>
    </main>
  );
}
