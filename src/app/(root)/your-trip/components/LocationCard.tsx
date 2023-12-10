import GoogleImage from "@/components/GoogleImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OpeningHours, Photo, Review } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Rating from "@/components/shared/Rating";
import Link from "next/link";

type LocationCardProps = {
  name: string;
  photos: Photo[];
  rating?: number;
  opening_hours?: OpeningHours;
  description?: string;
  reviews: Review[];
  icon_mask_base_uri?: string;
};

export default function LocationCard({
  name,
  photos,
  rating,
  icon_mask_base_uri,
  opening_hours,
  reviews,
  description,
}: LocationCardProps) {
  const firstPhotoReference =
    photos?.length > 0 ? photos[0].photo_reference : null;

  console.log(opening_hours);
  return (
    <Card className="max-w-2xl px-4 py-5 shadow-lg">
      <Tabs defaultValue="details">
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          <TabsList className="flex justify-between">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="flex flex-col gap-5" value="details">
          <CardContent className="p-0 flex flex-col gap-3">
            {firstPhotoReference ? (
              <GoogleImage
                photo_reference={firstPhotoReference}
                width={photos[0].width}
                height={photos[0].height}
                src=""
                alt=""
                className="aspect-video object-cover rounded-md"
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            )}
            <div className="flex justify-end gap-5">
              <HoverCard>
                <HoverCardTrigger>Opening hours</HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard>
              <span>{rating ? <Rating rating={rating} /> : null}</span>
            </div>
            <p className=" text-muted-foreground">{description}</p>
          </CardContent>
        </TabsContent>
        <TabsContent value="reviews">
          <CardContent className="p-0 flex flex-col gap-3">
            {reviews?.map((review, i) => (
              <Card className="flex flex-col gap-1 p-3 bg-muted" key={i}>
                <CardTitle className="flex items-center justify-between gap-3">
                  <Link
                    className="flex gap-2"
                    href={review.author_url}
                    target="_blank"
                  >
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={24}
                      height={24}
                      className="rounded-full aspect-square object-cover"
                    />
                    <span>{review.author_name}</span>
                  </Link>
                  <div className="text-sm flex items-center gap-2">
                    <Rating rating={review.rating} />
                    <div> {review.relative_time_description}</div>
                  </div>
                </CardTitle>
                <CardDescription>{review.text}</CardDescription>
              </Card>
            ))}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
