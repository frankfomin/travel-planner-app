import GoogleImage from "@/components/GoogleImage";
import { db } from "@/db/db";
import { trip } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

export default async function TripHeader({ tripId }: { tripId: string }) {
  const tripDetails = await db.select().from(trip).where(eq(trip.id, tripId));

  const images = [
    {
      src: "https://images.unsplash.com/photo-1636319039199-4b81fe4d9552?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1586715725848-5076bbcba8ef?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1567336724595-8210dfb04c44?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      src: "https://images.unsplash.com/photo-1596482371912-feb21e0cb285?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const firstTrip = tripDetails[0];
  return (
    <header className="relative w-full flex flex-col gap-10 ">
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
        <p className=" text-muted-foreground">{firstTrip.description}</p>
      </section>
    </header>
  );
}
