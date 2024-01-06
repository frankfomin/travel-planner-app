import YourTrip from "./components/YourTrip";
import { Suspense } from "react";
import Loading from "./Loading";
import { db } from "@/db/db";
import { location, trip } from "@/db/schema";
import { nanoid } from "nanoid";

export default async function YourTripPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tripId = nanoid();
  async function poop() {
    "use server";
    Promise.all([
      await db.insert(trip).values({
        id: tripId,
        userId: "",
        name: "",
        city: "",
        description: "",
        photo_reference: "",
        width: 0,
        height: 0,
      }),
    ]);
  }
  
  if (searchParams.action === "save") {
    await poop();
  }

  console.log(searchParams.action);

  return (
    <main className="p-3">
      <Suspense fallback={<Loading />}>
        <YourTrip tripId={tripId} params={searchParams.action} />
      </Suspense>
    </main>
  );
}
