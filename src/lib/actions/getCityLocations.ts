import axios from "axios";
import { headers } from "next/headers";

export async function getCityLocations() {
  const res = await axios
    .get("http://localhost:3000/api/openAi/getCityLocations", {
      headers: Object.fromEntries(headers()),
    })
    .catch((error) => {
      console.log("cityLocations", error);
    });
  if (res && res.data) {
    return res.data as string[];
  }
}
