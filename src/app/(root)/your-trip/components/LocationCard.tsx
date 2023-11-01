import GoogleImage from "@/components/GoogleImage";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
        {firstPhotoReference ? (
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleImage
              photo_reference={firstPhotoReference}
              width={photos[0].width}
              height={photos[0].height}
              src=""
              alt=""
              className="aspect-video object-cover rounded-md"
            />
          </Suspense>
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
        <p className=" text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
