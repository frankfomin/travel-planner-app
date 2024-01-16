import { headers } from "next/headers";

async function getCityDescription() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/openai/descriptions/cityDescription`,
    {
      headers: Object.fromEntries(headers()),
    }
  );

  const data = await response.json();

  return data.description;
}

export default async function CityDescription() {
  const description = await getCityDescription();

  if (!description) {
    throw new Error("description error");
  }

  return (
    <h2 className="sm:text-center text-muted-foreground">{description}</h2>
  );
}
