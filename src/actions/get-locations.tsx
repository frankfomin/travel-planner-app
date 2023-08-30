import axios from "axios";

type Location = {
  location_id: string;
  name: string;
  address_obj: {
    street1?: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    postalcode?: string;
    address_string?: string;
  };
};

type getLocationParams = {
  name: string;
};

export default async function getLocations({
  name,
}: getLocationParams): Promise<Location | undefined> {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/locations/${name}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
