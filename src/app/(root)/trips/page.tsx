import axios from "axios";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Trips from "./components/Trips";
import { Suspense } from "react";
import Loading from "./Loading";
import { headers } from "next/headers";
import { getTrips } from "@/lib/actions/trips.action";

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

export default async function TripsPage() {
  /*   const data = await getTrips();
   */

  return (
    <main className="flex justify-center">
      {/*       {data?.length! > 0 ? (
       */}{" "}
      <section className="flex flex-col gap-4 mt-16 w-full max-w-5xl ">
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-semibold">My trips</h1>
          <Link href="/">
            <Button>Create a trip with Ai</Button>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <Trips />
        </Suspense>
      </section>
      {/*       ) : (
       */}{" "}
      {/*  <section className="text-center flex flex-col items-center gap-4">
          <h1 className="text-9xl font-semibold">No trips found </h1>
          <p className=" text-xl max-w-[50%]">
            Seems like you&apos;re starting with a clean slate! No worries –
            your next adventure is just a few taps away. With our AI-powered
            trip planning tool, creating your dream trip is a breeze. Let&apos;s
            get started on crafting an unforgettable journey tailored to your
            preferences and desires
          </p>
        </section> */}
      {/*       )}
       */}{" "}
    </main>
  );
}
