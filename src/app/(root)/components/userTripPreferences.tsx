"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { dateContext, travellingWithContext } from "@/context/message";
import React, { Suspense } from "react";
import Activities from "./Activities";

export default function UserTripPreferences() {
  const { date, setDate } = dateContext();
  const { setTravellingWith, travellingWith } = travellingWithContext();
  const travellingWithArr = [
    "Family",
    "Partner",
    "Friends",
    "Solo",
    "Business",
  ];

  return (
    <>
      <section className="flex flex-col gap-10 justify-center items-center absolute w-full -right-full top-1/2 -z-50">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl">Let&apos;s plan your adventure</h2>
          <h3 className="text-2xl text-muted-foreground">
            How many days are you staying?
          </h3>
        </div>
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            max={7}
            className="rounded-md border"
          />
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            max={7}
            fromMonth={new Date(2023, 10, 10)}
            className="rounded-md border"
          />
        </div>
      </section>
      <section className="flex flex-col gap-10 justify-center items-center absolute w-full -right-[200%] top-1/2">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl">Who are you travelling with?</h2>
          <h3 className="text-2xl text-muted-foreground">Choose one</h3>
        </div>
        {travellingWithArr.map((item) => (
          <Badge
            key={item}
            className=" select-none hover:cursor-pointer"
            variant={item === travellingWith ? "default" : "secondary"}
            onClick={() => setTravellingWith(item)}
          >
            {item}
          </Badge>
        ))}
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <Activities />
      </Suspense>
    </>
  );
}
