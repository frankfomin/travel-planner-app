"use client";

import GoogleImage from "@/components/GoogleImage";
import LocationCard from "@/components/LocationCard";
import TripHeader from "@/components/TripHeader";
import { Button } from "@/components/ui/button";
import { dataFromApi, dataToApi } from "@/context/message";
import { Place } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { set } from "zod";

export default function TripPag() {
  const router = useRouter();
  const { city, activities, placeId } = dataToApi();
  const { setLocations, locations } = dataFromApi();

  console.log(city, activities);

  type data = {
    city: string;
    activities: string[];
  };
  type googleLocData = {
    locations: string[];
    lat: number;
    lng: number;
  };

  useEffect(() => {
    getCityLoc({ city, activities });
    getCityDesc(city);
    getCityBias(placeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    mutate: getCityLoc,
    isLoading: cityLocLoading,
    data: cityLoc,
  } = useMutation({
    mutationKey: ["getCityLoc"],
    mutationFn: async ({ city, activities }: data) => {
      const response = await fetch("/api/openAi/cityLoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, activities }),
      });

      const responseData = await response.json();

      return responseData;
    },
  });

  //can probably be called within an api route
  const {
    mutate: getCityBias,
    isLoading: cityBiasLoading,
    data: cityBias,
  } = useMutation({
    mutationKey: ["getCityBias"],
    mutationFn: async (placeId: string) => {
      const response = await fetch("/api/cityBias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(placeId),
      });

      const { lat, lng } = await response.json();
      return { lat, lng };
    },
  });

  const {
    mutate: getGoogleLocData,
    isLoading: googleLocLoading,
    data: googleLoc,
    status: GoogleStatus,
  } = useMutation({
    mutationKey: ["getGoogleLocData"],
    mutationFn: async (payload: googleLocData) => {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      return responseData;
    },
  });

  if (GoogleStatus === "success") {
    console.log("PUSHING");
    router.push("/your-trip");
  }

  //can be in a component
  const {
    mutate: getCityDesc,
    isLoading: cityDescLoading,
    data: cityDesc,
  } = useMutation({
    mutationKey: ["getCityDesc"],
    mutationFn: async (city: string) => {
      const response = await fetch("/api/openAi/cityDesc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      const responseData = await response.json();
      return responseData;
    },
  });

  useEffect(() => {
    console.log("USEFFECT running");
    if (cityBias && cityLoc) {
      const payload = {
        city: city,
        locations: cityLoc, // Combine the array into a string
        lat: cityBias.lat,
        lng: cityBias.lng,
      };

      console.log("PAYLOAD", payload);
      setLocations(cityLoc);

      getGoogleLocData(payload);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityBias, cityLoc]);

  return (
    <div>
      {/*   <main className="flex flex-col">
        {city}
        {activities}
        <div className="flex flex-col gap-5">
          {googleLoc?.map((loc: Place, i: number) => (
            <LocationCard
              key={i}
              cityLoc={cityLoc}
              name={loc.name}
              photos={loc.photos}
              rating={loc.rating}
              description={loc.description}
            />
          ))}
        </div>
      </main> */}
    </div>
  );
}
