import Image from "next/image";
import React from "react";
import Search from "./Search";

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

export default function CitySearch() {
  
  return (
      <section className="flex flex-col gap-10">
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
          <Search />
        </div>
      </section>
  );
}
