import Image from "next/image";

type GoogleImageProps = {
  photo_reference: string;
  width: number;
  height: number;
};
export default function GoogleImage({
  photo_reference,
  width,
  height,
}: GoogleImageProps) {
  return (
    <Image
      className="object-cover aspect-video rounded-md"
      width={width + 3000}
      height={height + 3000}
      priority
      alt="tratt"
      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`}
    />
  );
}
