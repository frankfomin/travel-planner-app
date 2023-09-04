"use client";

import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompletion } from "ai/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "@/context/message";
import Location from "@/components/location";
const activityArr = [
  "Sunbathing",
  "Restaurants",
  "Nightlife",
  "Museum",
  "alcohol",
  "party",
];

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

export default function Completion() {
  const {
    city,
    setCity,
    activities,
    setActivities,
    allMessages,
    setAllMessages,
    message,
    setMessage,
  } = useStore();

  const [delayedValue, setDelayedValue] = useState("");
  const [value, setValue] = useState("");

  const { data, error, isLoading } = useSWR(
    `/api/locations/${delayedValue}`,
    fetcher
  );

  const { completion, complete, input, setInput, stop, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/chat",
      body: {
        city: city,
        activities: activities,
      },
    });
  useEffect(() => {
    setInput("null");
  }, []);

  useEffect(() => {
    // Set a delay of 300 milliseconds (adjust as needed)
    const delay = setTimeout(() => {
      setDelayedValue(value);
    }, 300);

    // Clear the timeout if the value changes before the delay
    return () => clearTimeout(delay);
  }, [value]);

  function handleClick(cityName: string) {
    setCity(cityName);
  }

  function handleActivityClick(newActivity: string) {
    setActivities([...activities, newActivity]);
  }

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  const checkAndPublish = useCallback(
    async (c: string) => {
      const completion = await complete(c);
      if (!completion) throw new Error('Failed to check typos');
      const typos = JSON.parse(completion);
      // you should more validation here to make sure the response is valid
      if (typos?.length && !window.confirm('Typos found… continue?')) return;
      else alert('Post published');
    },
    [complete],
  );
  // Regular expression to find starred names enclosed in double asterisks, names wrapped with ^^ ^^, and text enclosed in ## ##
  const combinedRegex = /\*\*(.*?)\*\* - \^\^(.*?)\^\^|##(.*?)##/g;

  const combinedNames = [];
  const enclosedText = [];

  let match;

  while ((match = combinedRegex.exec(completion)) !== null) {
    const name = match[1];
    const description = match[2];
    const textInsideEnclosure = match[3];

    if (name && description) {
      combinedNames.push({ name, description });
    }

    if (textInsideEnclosure) {
      enclosedText.push(textInsideEnclosure);
    }
  }
  console.log("Combined Names:", combinedNames);

  console.log("Enclosed Text:", enclosedText);
  return (
    <main className="flex flex-col justify-center m-40 items-center">
      <h1 className=" font-bold text-9xl">{city}</h1>
      <div>
        <div className=" bg-black">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              className=" text-black"
              placeholder="Where to? Let's find out"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="p-2 bg-slate-100 rounded-xl text-black"
            >
              Submit
            </button>
          </form>
          <div>
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center hover:cursor-pointer p-2 hover:bg-slate-900"
                  >
                    <Skeleton className="w-[80%] h-[15px] rounded-full" />
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
                      className="feather feather-map-pin "
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
      <div>
        <div className=" mt-52 flex gap-6">
          {activityArr.map((activity, i) => (
            <div
              key={i}
              className=" hover:cursor-pointer"
              onClick={() => handleActivityClick(activity)}
            >
              {activity}
            </div>
          ))}
        </div>
      </div>
      {completion}
      {combinedNames.map((thing, i) => (
        <div key={i}>
          <Location name={thing.name} description={thing.description} />
        </div>
      ))}
            {enclosedText}

    </main>
  );
}
