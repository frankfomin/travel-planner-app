"use client";
import useSWR from "swr";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type AutocompleteResult = {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
};

export default function Home() {
  const [value, setValue] = useState("");
  const [delayedValue, setDelayedValue] = useState("");
  const [cityName, setCityName] = useState("");
  const { data, error, isLoading } = useSWR(
    `/api/locations/${delayedValue}`,
    fetcher
  );

  useEffect(() => {
    // Set a delay of 300 milliseconds (adjust as needed)
    const delay = setTimeout(() => {
      setDelayedValue(value);
    }, 400);

    // Clear the timeout if the value changes before the delay
    return () => clearTimeout(delay);
  }, [value]);

  function handleClick(cityName: string) {
    setCityName(cityName);
  }

  return (
    <main className="flex flex-col justify-center m-40 items-center">
      <h1 className=" font-bold text-9xl">{cityName}</h1>
      <div>
        <div className=" bg-black">
          <form>
            <Input
              type="text"
              className=" text-black"
              placeholder="type a city or town"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </form>
          <div>
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center hover:cursor-pointer p-2 hover:bg-slate-900"
                  >
                    <Skeleton className="w-[80%] h-[15px]   rounded-full" />
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
                      className="feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                ))
              : data?.map((city: AutocompleteResult) => (
                  <div
                    key={city.place_id}
                    onClick={() =>
                      handleClick(city.structured_formatting.main_text)
                    }
                    className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-900"
                  >
                    <div className="p-2 ">
                      {city.structured_formatting.main_text}
                    </div>
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
                      className="feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
