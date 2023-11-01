import axios from "axios";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import DeleteTrip from "./DeleteTrip";
import { headers } from "next/headers";
import GoogleImage from "@/components/GoogleImage";

type Trip = {
  tripId: string;
  name: string;
  created_at: string;
  photo_reference: string;
  width: number;
  height: number;
};

async function getTrips(): Promise<Trip[] | undefined> {
  const response = await axios
    .get("http://localhost:3000/api/getTrips", {
      headers: Object.fromEntries(headers()),
    })
    .catch((err) => {
      console.log(err);
    });

  if (response && response.data) {
    return response.data as Trip[];
  }
}

export default async function Trips() {
  const data = await getTrips();

  return (
    <>
      {data?.map((trip: Trip, i) => (
        <Card key={i} className="flex gap-10 flex-shrink-0 overflow-hidden  ">
          <Link href={`trips/${trip.tripId}`} key={i}>
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
              <Link href={`trips/${trip.tripId}`} key={i}>
                <CardTitle>{trip.name}</CardTitle>
              </Link>
              <CardDescription>{trip.created_at}</CardDescription>
            </div>
            <DeleteTrip tripName={trip.name} tripId={trip.tripId} />
          </div>
        </Card>
      ))}
    </>
  );
}
