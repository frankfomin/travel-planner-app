

import axios from "axios";
import User from "./components/User";

type Trip = {
  tripId: string;
  name: string;
  created_at: string;
};

async function getTrips() {
  try {
    const { data } = await axios.post("http://localhost:3000/api/getTrips", {
      userId: "1",
    });
    return data;
  } catch (error) {}
}

export default async function Trips() {
  const data = await getTrips();
  console.log("DATA", data);

  return (
    <div>
      {data?.map((trip: Trip) => (
        <div key={trip.tripId}>
          <h1>{trip.name}</h1>
          <p>{trip.created_at}</p>
        </div>
      ))}
      <User />
    </div>
  );
}
