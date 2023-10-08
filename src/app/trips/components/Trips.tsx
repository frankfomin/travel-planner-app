import axios from "axios";

type Trip = {
  tripId: string;
  name: string;
  created_at: string;
};

async function getTrips() {
  try {
    const res = await axios.post("http://localhost:3000/api/getTrips");

    console.log("RES DATA",res.data)
    return res.data;
  } catch (error) {}
}

export default async function Trips() {
  const data = await getTrips();

  return (
    <div>
      <h1>COCKDICK</h1>
      {JSON.stringify(data)}
      {data?.map((trip: Trip) => (
        <div key={trip.tripId}>
          <h1>{trip.name}</h1>
          <p>{trip.created_at}</p>
        </div>
      ))}
    </div>
  );
}
