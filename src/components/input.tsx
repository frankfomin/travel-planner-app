/* "use client"

import useSWR from "swr";
import { useState } from "react";

export default function Input() {
  const [value, setValue] = useState("");
  const { data, error, isLoading } = useSWR(`/api/locations/${value}`);
  console.log(value);
  return (
    <div className=" flex justify-center ">
      <input
        type="text"
        value={value}
        className=" p-2  border-2 border-black"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
 */