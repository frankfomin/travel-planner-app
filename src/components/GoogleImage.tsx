import Image, { ImageProps } from "next/image";

type GoogleImageProps = ImageProps & {
  photo_reference: string;
};
export default function GoogleImage({ photo_reference, ...props }: GoogleImageProps) {
  return (
    <Image
      {...props}
      alt=""
      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
    />
  );
}
