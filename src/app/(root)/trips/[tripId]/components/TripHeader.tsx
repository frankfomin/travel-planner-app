import GoogleImage from "@/components/GoogleImage";
import { db } from "@/db/db";
import { trip } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

export default async function TripHeader({ tripId }: { tripId: string }) {
  const tripDetails = await db
    .select()
    .from(trip)
    .where(eq(trip.tripId, tripId));

  const firstTrip = tripDetails[0];
  return (
    <header className="relative w-full flex flex-col gap-10 ">
      <section className="flex justify-center items-center">
        <h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">
          {firstTrip.city}
        </h1>
        <div className="w-full h-full relative flex flex-col items-center">
          <div className=" aspect-video max-w-4xl rounded-md w-full h-full bg-black absolute opacity-30  " />
          <GoogleImage
            photo_reference={firstTrip.photo_reference}
            width={firstTrip.width}
            height={firstTrip.height}
            alt=""
            src=""
            className="aspect-video object-cover max-w-4xl rounded-md w-full h-full"
          />
        </div>
      </section>
      <section className="flex justify-center">
        <p className=" text-muted-foreground">{firstTrip.description}</p>
      </section>
    </header>
  );
}
