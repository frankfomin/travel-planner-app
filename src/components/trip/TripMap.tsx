import { getGeoData } from "@/lib/actions/location.actions";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import React from "react";
import GoogleMap from "./GoogleMap";

export default async function TripMap({
  locations,
  lat,
  lng,
}: {
  locations: string[];
  lat: number;
  lng: number;
}) {
  const { geoData } = await getGeoData({ locations, lat, lng });

  return <GoogleMap lat={lat} lng={lng} geoData={geoData} />;
}
