import React from "react";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { getCityImage } from "@/lib/actions/getCityImage";
import GoogleImage from "../GoogleImage";
import { saveTrip } from "@/lib/actions/saveTrip.action";
import { tripDetails } from "@/lib/actions/location.action";

type tripDetails = {
  city: string;
  place_id: string;
};

export default async function TripHeader({
  tripId,
  params,
}: {
  tripId: string;
  params: string | string[] | undefined;
}) {
  const details = await tripDetails();

  console.log(details);

  if (params === "save") {
    await saveTrip({
      saveTrip: true,
      tripId,
      city: details?.city,
      width: details?.photo.width,
      height: details?.photo.height,
      photo_reference: details?.photo.photo_reference,
    });
  }

  return (
    <section className="flex justify-center items-center">
      <h1 className=" absolute sm:text-9xl text-5xl font-semibold z-10 text-primary-foreground">
        {details?.city}
      </h1>
      <div className="w-full h-full relative flex flex-col items-center">
        <div className=" aspect-video rounded-md w-full h-full bg-black absolute opacity-30  " />
        <div className=" aspect-video object-cover rounded-md w-full h-full ">
          <GoogleImage
            className="aspect-video object-cover  rounded-md w-full h-full"
            photo_reference={details?.photo.photo_reference as string}
            width={details?.photo.width}
            height={details?.photo.height}
            src=""
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
