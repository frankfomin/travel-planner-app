import React from "react";
type LocationProps = {
  name: string;
  description: string;
};
export default function Location({ name, description }: LocationProps) {
  return (
    <div className=" border-2 border-black p-4">
        <div className=" text-3xl font-semibold">{name}</div>
        <div className=" text-2xl">{description}</div>
    </div>
  )
}
