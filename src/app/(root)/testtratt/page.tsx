import React from "react";
import SaveAss from "./saveAss";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams.action);
  
  return (
    <SaveAss />
  )
}
