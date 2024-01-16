import React from "react";

import GoogleImage from "../GoogleImage";
import { saveTrip } from "@/lib/actions/saveTrip.action";
import { tripDetails } from "@/lib/actions/location.actions";

type tripDetails = {
  city: string;
  place_id: string;
};

export default async function TripHeader() {
  const details = await tripDetails();

  console.log(details);

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
