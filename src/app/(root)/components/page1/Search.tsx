"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { AutocompleteResult } from "@/types";
import { formContext } from "@/context/Form";
import { Input } from "@/components/ui/input";
import { citySearchSchema } from "@/lib/validators/travelPlanning";

export default function Search() {
  const [value, setValue] = useState("");
  const [delayedValue, setDelayedValue] = useState("");
  const { nextStep, step, formData } = formContext();

  const {
    mutate: sendMessage,
    data,
  } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (city: string) => {
      const response = await fetch("/api/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      const responseData = await response.json();
      return responseData as AutocompleteResult[];
    },
  });
  useEffect(() => {
    const delay = setTimeout(() => {
      sendMessage(delayedValue);
    }, 200);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayedValue]);

  useEffect(() => {
    setValue(value);

    clearTimeout(delayedValue);

    const delay = setTimeout(() => {
      setDelayedValue(value);
    }, 200);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);


  return (
    <div className="flex flex-col relative">
      <Input
        type="text"
        placeholder="Where to? Let's find out"
        className=" rounded-b-none rounded-t-md pr-14 px-4 py-6 outline-none text-2xl"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <form>
        <Card
          className={`rounded-t-none ${
            data?.length === 0 ? "border-none" : ""
          } `}
        >
          <CardContent className=" p-0">
            {data?.map((city: AutocompleteResult, i: number) => (
              <button
                formAction={() => {
                  const cityData = {
                    city: city.structured_formatting.main_text,
                    place_id: city.place_id,
                  };

                  const result = citySearchSchema.safeParse(cityData);

                  if (!result.success) {
                    toast.error("Something went wrong");
                    return;
                  }
                  
                  formData.cityName = result.data.city;
                  formData.placeId = result.data.place_id;
                  nextStep();
                  console.log(step)
                }}
                key={city.place_id}
                className="flex items-center hover:cursor-pointer relative p-2 w-full "
              >
                <div className="flex gap-3 items-center w-full  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    className=" w-10 h-10"
                  >
                    <path
                      d="M10.1538 20.5483C8.77048 20.5483 7.47048 20.2858 6.25381 19.7608C5.03714 19.2358 3.97881 18.5233 3.07881 17.6233C2.17881 16.7233 1.46631 15.665 0.941309 14.4483C0.416309 13.2317 0.153809 11.9317 0.153809 10.5483C0.153809 9.16501 0.416309 7.86501 0.941309 6.64834C1.46631 5.43167 2.17881 4.37334 3.07881 3.47334C3.97881 2.57334 5.03714 1.86084 6.25381 1.33584C7.47048 0.81084 8.77048 0.54834 10.1538 0.54834C11.5371 0.54834 12.8371 0.81084 14.0538 1.33584C15.2705 1.86084 16.3288 2.57334 17.2288 3.47334C18.1288 4.37334 18.8413 5.43167 19.3663 6.64834C19.8913 7.86501 20.1538 9.16501 20.1538 10.5483C20.1538 11.9317 19.8913 13.2317 19.3663 14.4483C18.8413 15.665 18.1288 16.7233 17.2288 17.6233C16.3288 18.5233 15.2705 19.2358 14.0538 19.7608C12.8371 20.2858 11.5371 20.5483 10.1538 20.5483ZM10.1538 18.5483C12.3871 18.5483 14.2788 17.7733 15.8288 16.2233C17.3788 14.6733 18.1538 12.7817 18.1538 10.5483C18.1538 10.4317 18.1496 10.3108 18.1413 10.1858C18.133 10.0608 18.1288 9.95667 18.1288 9.87334C18.0455 10.3567 17.8205 10.7567 17.4538 11.0733C17.0871 11.39 16.6538 11.5483 16.1538 11.5483H14.1538C13.6038 11.5483 13.133 11.3525 12.7413 10.9608C12.3496 10.5692 12.1538 10.0983 12.1538 9.54834V8.54834H8.15381V6.54834C8.15381 5.99834 8.34964 5.52751 8.74131 5.13584C9.13298 4.74417 9.60381 4.54834 10.1538 4.54834H11.1538C11.1538 4.16501 11.258 3.82751 11.4663 3.53584C11.6746 3.24417 11.9288 3.00667 12.2288 2.82334C11.8955 2.74001 11.558 2.67334 11.2163 2.62334C10.8746 2.57334 10.5205 2.54834 10.1538 2.54834C7.92048 2.54834 6.02881 3.32334 4.47881 4.87334C2.92881 6.42334 2.15381 8.31501 2.15381 10.5483H7.15381C8.25381 10.5483 9.19548 10.94 9.97881 11.7233C10.7621 12.5067 11.1538 13.4483 11.1538 14.5483V15.5483H8.15381V18.2983C8.48714 18.3817 8.81631 18.4442 9.14131 18.4858C9.46631 18.5275 9.80381 18.5483 10.1538 18.5483Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="flex gap-3 flex-col w-full items-start">
                    <div className="flex flex-col gap-1 items-start">
                      <div>{city.structured_formatting.main_text}</div>
                      <div className="text-sm opacity-60">
                        {city.structured_formatting.secondary_text}
                      </div>
                    </div>
                    <div className="flex justify-center w-full ">
                      {i !== data.length - 1 ? (
                        <Separator className="" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
