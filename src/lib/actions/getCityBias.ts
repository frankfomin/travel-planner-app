import axios from "axios";
import { headers } from "next/headers";
import { toast } from "sonner";

type cityBias = {
  lat: number;
  lng: number;
};
export async function getCityBias() {
  const res = await axios.get("http://localhost:3000/api/cityBias", {
    headers: Object.fromEntries(headers()),
  });

  return res.data as cityBias;
}
