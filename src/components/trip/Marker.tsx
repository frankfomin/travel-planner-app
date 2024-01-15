"use client";

import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { getCachedLocationData } from "@/lib/actions/location.actions";
import GoogleImage from "../GoogleImage";
import Rating from "../shared/Rating";
import MapCardLoading from "../loading/MapCardLoading";

export default function Marker({
  position,
  locationCount,
}: {
  position: { lat: number; lng: number };
  locationCount: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, data, isLoading } = useMutation({
    mutationFn: async ({ locationCount }: { locationCount: number }) => {
      const res = await getCachedLocationData({ locationCount });
      return res;
    },
  });
  const firstPhotoReference =
    data?.details?.photos?.length! > 0
      ? data?.details?.photos[0].photo_reference
      : null;
  return (
    <>
      {isOpen}
      <AdvancedMarker
        onClick={() => {
          setIsOpen(true);
          if (!data) {
            mutate({ locationCount });
          }
        }}
        position={position}
      >
        <Pin background="#6d28d9" borderColor="#6d28d9" glyphColor={"black"} />
      </AdvancedMarker>
      {isOpen && (
        <InfoWindow position={position} onCloseClick={() => setIsOpen(false)}>
          {!isLoading ? (
            <Card className="max-w-sm bg-transparent text-secondary border-none">
              <div className="flex justify-between">
                <CardTitle className="text-2xl sm:text-xl">
                  {data?.details?.name}
                </CardTitle>
                <Rating rating={data?.details?.rating || 5} />
              </div>

              <CardContent className="p-0 flex flex-col gap-3">
                {firstPhotoReference ? (
                  <GoogleImage
                    photo_reference={firstPhotoReference}
                    width={data?.details?.photos[0].width}
                    height={data?.details?.photos[0].height}
                    src=""
                    alt=""
                    className="aspect-video object-cover w-full rounded-md"
                  />
                ) : (
                  <div className="flex h-full justify-center items-center aspect-video object-cover rounded-md dark:bg-muted bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-image"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <MapCardLoading />
          )}
        </InfoWindow>
      )}
    </>
  );
}
