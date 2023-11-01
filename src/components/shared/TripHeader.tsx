import React from "react";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { getCityImage } from "@/lib/actions/getCityImage";
import GoogleImage from "../GoogleImage";

type tripDetails = {
  city: string;
  place_id: string;
};

export default async function TripHeader({
  cityDescription,
}: {
  cityDescription: string;
}) {
  async function getDetails() {
    "use server";
    const cookie = cookies();
    const userId = cookie.get("userId");

    const tripDetails: tripDetails | null = await redis.hgetall(
      `tripDetails:${userId?.value}`
    );

    return tripDetails;
  }

  const tripDetails = await getDetails();
  const cityImage = await getCityImage(
    tripDetails?.city,
    tripDetails?.place_id
  );

  return (
    <header className="relative w-full flex flex-col gap-10 ">
      <section className="flex justify-center items-center">
        <h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">
          {tripDetails?.city}
        </h1>
        <div className="w-full h-full relative flex flex-col items-center">
          <div className=" aspect-video max-w-4xl rounded-md w-full h-full bg-black absolute opacity-30  " />
          <div className=" aspect-video object-cover max-w-4xl rounded-md w-full h-full ">
            <GoogleImage
              photo_reference={cityImage.photo_reference}
              width={cityImage.width}
              height={cityImage.height}
            />
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <p className=" text-muted-foreground">{cityDescription}</p>
      </section>
    </header>
  );
}
