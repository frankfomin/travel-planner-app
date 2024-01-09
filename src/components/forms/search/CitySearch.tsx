import Image from "next/image";
import React from "react";
import Search from "./Search";
import { Icons } from "@/components/ui/icons";

export default function CitySearch() {
  return (
    <section className="flex flex-col gap-10">
      <div className="sm:text-9xl text-4xl font-semibold">
        <div className="flex items-center gap-3 justify-center">
          <h1>Seeking</h1>
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3648&q=80"
            width={400}
            height={400}
            className="sm:aspect-[4/3] object-cover aspect-video rounded-md sm:w-52 w-24"
            alt="road"
          />
          <Icons.plane className="sm:w-40 sm:h-40 w-20 h-20" />
        </div>
        <div className="flex gap-3 items-center justify-center">
          <span>New</span>
          <Image
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80"
            width={400}
            height={400}
            className="sm:aspect-square aspect-video object-cover rounded-md sm:w-52 w-24"
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
