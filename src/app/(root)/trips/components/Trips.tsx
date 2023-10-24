import axios from "axios";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import DeleteTrip from "./DeleteTrip";
import { headers } from "next/headers";

type Trip = {
  tripId: string;
  name: string;
  created_at: string;
};

type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
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
            <Image
              width={400}
              height={400}
              alt="trip"
              src="https://images.unsplash.com/photo-1530330222720-9e081f1e46bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              className=" aspect-square max-w-xs max-h-56 object-cover "
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
