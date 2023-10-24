import axios from "axios";
import { headers } from "next/headers";

export async function getCityDescription() {
  const res = await axios.get(
    "http://localhost:3000/api/openAi/getCityDescription",
    {
      headers: Object.fromEntries(headers()),
    }
  );

  return res.data as string;
}
