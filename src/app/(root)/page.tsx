"use client";

import ActivityPage from "@/components/ui/ActivityPage";
import CitySearch from "@/components/ui/CitySearch";
import ProgressBar from "@/components/ui/ProgressBar";
import { dataToApi } from "@/context/message";
import Image from "next/image";

export default function HomePage() {
  const { city, setCity } = dataToApi();
  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <section
        className={`min-h-[100svh] w-full  flex gap-10 flex-col items-center transition-transform ease-out mt-44 h-full ${
          city ? " -translate-x-full" : null
        }`}
      >
        <ProgressBar />
        <div className="text-9xl font-semibold">
          <div className="flex items-center gap-5 justify-center">
            <h1>Seeking</h1>
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3648&q=80"
              width={400}
              height={400}
              className=" aspect-[4/3] rounded-md w-[13rem]"
              alt="road"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="158"
              height="158"
              viewBox="0 0 158 158"
              fill="currentColor"
              className=" w-40 h-40"
            >
              <mask
                id="mask0_42_1235"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="158"
                height="158"
              >
                <rect width="158" height="158" fill="currentColor" />
              </mask>
              <g mask="url(#mask0_42_1235)">
                <path
                  d="M45.0962 112.903L24.0295 101.382L30.942 94.4695L47.4003 96.7736L73.0753 71.0986L21.7253 43.1195L30.942 33.9028L93.8128 50.032L119.652 24.5215C121.518 22.6563 123.849 21.7236 126.647 21.7236C129.445 21.7236 131.777 22.6563 133.642 24.5215C135.507 26.3868 136.44 28.7184 136.44 31.5163C136.44 34.3143 135.507 36.6459 133.642 38.5111L107.967 64.1861L124.096 127.057L114.88 136.274L86.9003 84.9236L61.2253 110.599L63.5295 127.057L56.617 133.969L45.0962 112.903Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          <div className="flex gap-5 items-center">
            <span>New</span>
            <Image
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80"
              width={400}
              height={400}
              className="aspect-square rounded-md w-[10rem]"
              alt="road"
            />
            <span>Horizons?</span>
          </div>
        </div>
        <CitySearch />
      </section>
      <div
        className={` absolute w-full min-h-[100svh]  -right-full transition-transform ease-out ${
          city ? "-translate-x-full" : ""
        }`}
      >
        <ActivityPage />
      </div>
    </main>
  );
}

/* "use client";

import CitySearch from "@/components/ui/CitySearch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { gsap } from "gsap";
export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  function handleIncrement() {
    if (index == 2) return;

    console.log("increment", index * 100);
    gsap.to(wrapperRef.current, {
      translateX: `-=${100}%`,
      duration: 0.1,
    });
  }

  function handleDecrement() {
    if (index == 0) return;

    console.log("Decrement", index * 100);

    gsap.to(wrapperRef.current, {
      translateX: `+=${100}%`,
      duration: 0.1,
    });
  }

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="158"
      height="158"
      viewBox="0 0 158 158"
      fill="currentColor"
      className=" w-40 h-40"
    >
      <mask
        id="mask0_42_1235"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="158"
        height="158"
      >
        <rect width="158" height="158" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_42_1235)">
        <path
          d="M45.0962 112.903L24.0295 101.382L30.942 94.4695L47.4003 96.7736L73.0753 71.0986L21.7253 43.1195L30.942 33.9028L93.8128 50.032L119.652 24.5215C121.518 22.6563 123.849 21.7236 126.647 21.7236C129.445 21.7236 131.777 22.6563 133.642 24.5215C135.507 26.3868 136.44 28.7184 136.44 31.5163C136.44 34.3143 135.507 36.6459 133.642 38.5111L107.967 64.1861L124.096 127.057L114.88 136.274L86.9003 84.9236L61.2253 110.599L63.5295 127.057L56.617 133.969L45.0962 112.903Z"
          className=" fill-muted-foreground"
        />
      </g>
    </svg>
  );

  return (
    <main className="mt-32">
      <div className="flex items-center w-full ">
        {index !== 0 && (
          <svg
            onClick={() => {
              handleDecrement(), setIndex((prev) => prev - 1);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-12 h-12 hover:cursor-pointer absolute top-1/2 left-0"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
        {index !== 2 && (
          <svg
            onClick={() => {
              handleIncrement(), setIndex((prev) => prev + 1);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-12 h-12 hover:cursor-pointer absolute top-1/2 right-0"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        )}
      </div>
      <div ref={wrapperRef} className={`absolute w-full transition-all`}>
        <section className="flex flex-col gap-10 absolute w-full ">
          <div className="text-9xl font-semibold">
            <div className="flex items-center gap-5 justify-center">
              <h1>Seeking</h1>
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3648&q=80"
                width={400}
                height={400}
                className=" aspect-[4/3] rounded-md w-[13rem]"
                alt="road"
              />
              {svg}
            </div>
            <div className="flex gap-5 items-center justify-center">
              <span>New</span>
              <Image
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80"
                width={400}
                height={400}
                className="aspect-square rounded-md w-[10rem]"
                alt="road"
              />
              <span>Horizons?</span>
            </div>
          </div>
          <div className="flex justify-center">
            <CitySearch />
          </div>
        </section>

        <section className="flex flex-col gap-10 justify-center items-center absolute w-full -right-full top-1/2">
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl">Let&apos;s plan your adventure</h2>
            <h3 className="text-2xl text-muted-foreground">
              How many days are you staying?
            </h3>
          </div>
          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              max={7}
              className="rounded-md border"
            />
            <Calendar
              mode="range"
              selected={date}
              max={7}
              fromMonth={new Date(2023, 10, 10)}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </section>
        <section className="flex flex-col items-center absolute w-full -right-[200%] ">
          <h3 className="text-5xl">Let&apos;s plan your adventure</h3>
          <Badge
            variant={`${isClicked ? "default" : "secondary"}`}
            className=" select-none hover:cursor-pointer"
            onClick={() => setIsClicked((prev) => !prev)}
          >
            Beach
          </Badge>
        </section>
      </div>
    </main>
  );
} */
