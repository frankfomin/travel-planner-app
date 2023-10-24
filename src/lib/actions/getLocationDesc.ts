import axios from "axios";
import { headers } from "next/headers";




export async function getCityLocationDesc(locationName: string) {
  const res = await axios.post(
    "http://localhost:3000/api/openAi/locationDesc",
    {
      locationName: locationName,
    },
    {
      headers: Object.fromEntries(headers()),
    }
  );

  return res.data as string;
}
