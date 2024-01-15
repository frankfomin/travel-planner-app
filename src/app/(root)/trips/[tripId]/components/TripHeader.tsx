import GoogleImage from "@/components/GoogleImage";
import { db } from "@/db/db";
import { Trip } from "@/types";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";

export default async function TripHeader({ trip }: { trip: Trip }) {
  return (
    <header className="relative w-full flex flex-col gap-10  ">
      <div className="grid gap-2">
        <section className="flex justify-center items-center">
          <h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">
            {trip?.city}
          </h1>
          <GoogleImage
            photo_reference={trip?.photo_reference || ""}
            width={trip?.width}
            height={trip?.height}
            alt=""
            src=""
            className="aspect-video object-cover max-w-4xl rounded-md w-full h-full"
          />
        </section>
        <section className="flex justify-center">
          <p className=" text-muted-foreground text-center max-w-4xl">
            {trip?.description}
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
