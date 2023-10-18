import { Card, CardContent, CardTitle } from "@/components/ui/card";
import GoogleImage from "../../../components/GoogleImage";
import { OpeningHours, Photo } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { Suspense } from "react";

type LocationCardProps = {
  name: string;
  photos: Photo[];
  rating?: number;
  opening_hours?: OpeningHours;
  description?: string;
};

export default function LocationCard({
  name,
  photos,
  rating,
  opening_hours,
  description,
}: LocationCardProps) {
  const firstPhotoReference =
    photos?.length > 0 ? photos[0].photo_reference : null;

  return (
    <Card className="flex flex-col gap-5 max-w-2xl px-4 py-5 shadow-lg">
      <CardTitle>{name}</CardTitle>
      <CardContent className="p-0 ">
        {firstPhotoReference && (
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleImage
              photo_reference={firstPhotoReference}
              width={photos[0].width}
              height={photos[0].height}
            />
          </Suspense>
        )}
        <p
          className="text-[#b6b7b7]">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
