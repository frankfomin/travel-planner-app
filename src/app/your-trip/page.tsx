import LocationCard from "@/components/LocationCard";
import SaveTrip from "@/components/ui/SaveTrip";
import { Place } from "@/lib/types";
import axios from "axios";

async function getCachedTrip() {
  try {
    const { data } = await axios.post("http://localhost:3000/api/cachedTrip", {
      body: JSON.stringify({ name: "trip" }),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function YourTrip() {
  const data = await getCachedTrip();




  return (
    <main className="flex flex-col">
      <SaveTrip locations={data} />
      <div className="flex flex-col gap-5">
        {data?.map((loc: Place, i: number) => (
          <LocationCard
            key={i}
            cityLoc={loc.name}
            name={loc.name}
            photos={loc.photos}
            rating={loc.rating}
            description={loc.description}
          />
        ))}
      </div>
    </main>
  );
}
