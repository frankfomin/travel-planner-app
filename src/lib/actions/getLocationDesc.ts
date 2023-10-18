import axios from "axios";
import { headers } from "next/headers";

export async function getCityLocationDesc(locationName: string) {
  const res = await axios
    .post(
      "http://localhost:3000/api/openAi/locationDesc",
      {
        locationName: locationName,
      },
      {
        headers: Object.fromEntries(headers()),
      }
    )
    .catch((error) => {
      console.log("cityLocationsdescription error", error);
    });
  if (res && res.data) {
    return res.data as string;
  }
}
