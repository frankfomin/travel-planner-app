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
  console.log("SDKASKDOAKSP", photo_reference);
  return (
    <Image
      className="object-cover aspect-video rounded-md"
      width={5000}
      height={5000}
      priority
      alt="tratt"
      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`}
    />
  );
}
