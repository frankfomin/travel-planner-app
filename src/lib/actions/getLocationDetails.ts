import axios from "axios";
import { headers } from "next/headers";
import { Place } from "../types";

type LocationDetails = {
  location: string;
  lat: number;
  lng: number;
};

export async function getLocationDetails({
  location,
  lat,
  lng,
}: LocationDetails) {
  const res = await axios.post(
    "http://localhost:3000/api/locations",
    {
      location: location,
      lat: lat,
      lng: lng,
    },
    {
      headers: Object.fromEntries(headers()),
    }
  );

  return res.data as Place;
}
