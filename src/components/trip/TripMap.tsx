import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import React from "react";
import GoogleMap from "./GoogleMap";
import axios from "axios";

async function getGeoData({
  locations,
  lat,
  lng,
}: {
  locations: string[];
  lat: number;
  lng: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/openai/locations/geoData`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locations,
        lat,
        lng,
      }),
    }
  );

  const data = await response.json();

  return data.geoData;
}

export default async function TripMap({
  locations,
  lat,
  lng,
}: {
  locations: string[];
  lat: number;
  lng: number;
}) {
  const geoData = await getGeoData({ locations, lat, lng });

  return <GoogleMap lat={lat} lng={lng} geoData={geoData} />;
}
