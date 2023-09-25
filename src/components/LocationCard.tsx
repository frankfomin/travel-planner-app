"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import GoogleImage from "./GoogleImage";
import { OpeningHours, Photo } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

type LocationCardProps = {
  name: string;
  photos: Photo[];
  rating?: number;
  opening_hours?: OpeningHours;
  cityLoc?: string;
  description?: string;
};

export default function LocationCard({
  name,
  photos,
  rating,
  opening_hours,
  cityLoc,
  description,
}: LocationCardProps) {
  const firstPhotoReference =
    photos?.length > 0 ? photos[0].photo_reference : null;

  console.log("cityLoc is", cityLoc);
  return (
    <Card className="flex flex-col gap-5 max-w-2xl px-4 py-5 shadow-lg">
      <CardTitle>{name}</CardTitle>
      <CardContent className="p-0 ">
        {firstPhotoReference && (
          <GoogleImage
            photo_reference={firstPhotoReference}
            width={photos[0].width}
            height={photos[0].height}
          />
        )}
        {description && <p className="text-gray-500">{description}</p>}
      </CardContent>
    </Card>
  );
}
