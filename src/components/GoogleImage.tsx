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
      width={width}
      height={height}
      alt="tratt"
      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=AIzaSyAiqem9JYwG1MhAqSQMSsJ10Q1MkRVoSUE`}
    />
  );
}
