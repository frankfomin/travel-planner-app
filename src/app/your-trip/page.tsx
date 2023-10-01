"use client";

import { redis } from "@/lib/redis";
import { Place } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function YourTrip() {
  useEffect(() => {
    mutate("london");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    mutate,
    isLoading,
    data: cachedTrip,
  } = useMutation({
    mutationKey: ["sajd"],
    mutationFn: async (city: string) => {
      const response = await fetch("/api/openAi/cityDesc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(null),
      });

      const responseData = await response.json();
      return responseData;
    },
  });

  return (
    <div>
      <h1>trip page</h1>
      {cachedTrip?.map((trip: Place) => (
        <div>{trip.name}</div>
      ))}
    </div>
  );
}
