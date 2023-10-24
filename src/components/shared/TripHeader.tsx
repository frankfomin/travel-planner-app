import axios from "axios";
import Image from "next/image";
import { NextRequest } from "next/server";
import React from "react";

export default async function TripHeader() {

  //fetch cityDetails from redis
  return (
    <header className="relative w-full flex flex-col gap-10 ">
      <section className="flex justify-center items-center">
        <h1 className=" absolute text-9xl font-semibold z-10 text-primary-foreground">Alicante</h1>
        <div className="w-full h-full relative flex flex-col items-center">
          <div className=" aspect-video max-w-4xl rounded-md w-full h-full bg-black absolute opacity-30  " />
          <Image
            width={500}
            height={500}
            alt="Alicante"
            className=" aspect-video object-cover max-w-4xl rounded-md w-full h-full "
            src="https://images.unsplash.com/photo-1586715725848-5076bbcba8ef?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </section>
      <section className="flex justify-center">
        <p className=" text-muted-foreground text. ">asdasdasdad</p>
      </section>
    </header>
  );
}
