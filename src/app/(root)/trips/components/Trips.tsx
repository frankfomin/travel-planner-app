import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteTrip from "./DeleteTrip";
import GoogleImage from "@/components/GoogleImage";
import { getTrips } from "@/lib/actions/trips.action";

export default async function Trips() {
  const trips = await getTrips();

  return (
    <>
      {trips?.trips?.map((trip, i) => (
        <Card key={i} className="flex gap-10 flex-shrink-0 overflow-hidden  ">
          <Link href={`trips/${trip.id}`} key={i}>
            <GoogleImage
              className="max-w-xs object-cover max-h-56"
              photo_reference={trip.photo_reference}
              width={trip.width}
              height={trip.height}
              alt="hello"
              src=""
            />
          </Link>

          <div className="mt-7 flex w-full justify-between pr-10">
            <div>
              <Link href={`trips/${trip.id}`} key={i}>
                <CardTitle>{trip.name}</CardTitle>
              </Link>
              <CardDescription>
                {new Date(trip.created_at).toLocaleDateString()}
              </CardDescription>
            </div>
            <DeleteTrip tripName={trip.name} tripId={trip.id} />
          </div>
        </Card>
      ))}
    </>
  );
}
