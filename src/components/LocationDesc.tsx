/* "use client";

import { dataFromApi } from "@/context/message";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function LocationDesc() {
  const { locations } = dataFromApi();

  const {
    mutate: getCityDesc,
    isLoading: cityDescLoading,
    data: locationDesc,
  } = useMutation({
    mutationKey: ["getCityDesc"],
    mutationFn: async (locations: string) => {
      const response = await fetch("/api/openAi/locationDesc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locations),
      });

      const responseData = await response.json();

      return responseData;
    },
  });

  useEffect(() => {
    if (locations) {
      getCityDesc(locations);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return <div>{locationDesc}</div>;
}
 */