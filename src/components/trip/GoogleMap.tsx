"use client";

import React from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Card, CardTitle } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import Marker from "./Marker";

export default function GoogleMap({
  lat,
  lng,
  geoData,
}: {
  lat: number;
  lng: number;
  geoData:
    | {
        lat: number;
        lng: number;
      }[]
    | undefined;
}) {
  const position = { lat: geoData?.[0]?.lat ?? 0, lng: geoData?.[0]?.lng ?? 0 };

  return (
    <div className="sticky top-0 sm:block hidden overflow-hidden rounded-md w-full h-screen max-w-[50%] max-h-[50%]">
      <Map
        className=""
        zoom={15}
        center={position}
        minZoom={15}
        disableDefaultUI
        mapId={"829a053c0c705f52"}
      >
        {geoData?.map((location, i) => {
          const position = { lat: location.lat, lng: location.lng };
          return <Marker position={position} locationCount={i} key={i} />;
        })}
      </Map>
    </div>
  );
}
