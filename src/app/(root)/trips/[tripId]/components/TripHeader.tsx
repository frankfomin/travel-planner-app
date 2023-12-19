import GoogleImage from "@/components/GoogleImage";
import { db } from "@/db/db";
import { trip } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

export default async function TripHeader({ tripId }: { tripId: string }) {
  const tripDetails = await db.select().from(trip).where(eq(trip.id, tripId));

  const firstTrip = tripDetails[0];
  return (
    <header className="relative w-full flex flex-col gap-10  ">
      <div className="grid gap-2">
        <section className="flex justify-center items-center">
          <h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">
            {firstTrip.city}
          </h1>
          <GoogleImage
            photo_reference={firstTrip.photo_reference}
            width={firstTrip.width}
            height={firstTrip.height}
            alt=""
            src=""
            className="aspect-video object-cover max-w-4xl rounded-md w-full h-full"
          />
        </section>
        <section className="flex justify-center">
          <p className=" text-muted-foreground text-center max-w-4xl">
            {firstTrip.description}
          </p>
        </section>
      </div>
    </header>
  );
}
{
  /* <section className="flex justify-center items-center">
<h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">
  {details?.city}
</h1>
<div className="w-full h-full relative flex flex-col items-center">
  <div className=" aspect-video rounded-md w-full h-full bg-black absolute opacity-30  " />
  <div className=" aspect-video object-cover rounded-md w-full h-full ">
    <GoogleImage
      className="aspect-video object-cover max-w-4xl rounded-md w-full h-full"
      photo_reference={details?.photo.photo_reference as string}
      width={details?.photo.width}
      height={details?.photo.height}
      src=""
      alt=""
    />
  </div>
</div>
</section> */
}
