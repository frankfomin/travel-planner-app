"use server";

import axios from "axios";
import { cookies, headers } from "next/headers";
import { redis } from "../redis";
import {
  chatDescPrompt,
  chatLocPrompt,
} from "@/helpers/constants/chatbot-prompt";
import OpenAI from "openai";

type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cookie = cookies();
const header = headers();
const userId = cookie.get("userId");

async function getIpAdress() {
  const ip = header.get("x-forwarded-for")!;
  console.log("IP: ", ip);
  return ip;
}

export async function getCityBias() {
  try {
    const ipAddress = await getIpAdress();

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 3) {
      return { rateLimit: "Too many requests" };
    }

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    const placeId = tripDetails?.place_id;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const place: Geometry = response.data.result.geometry;

    const lat = place.location.lat;

    const lng = place.location.lng;

    return { lat, lng };
  } catch (error) {
    console.error(error);
    return { error: "Internal error" };
  }
}

export async function getCityLocations() {
  try {
    const ipAddress = await getIpAdress();

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 3) {
      return { rateLimit: "Too many requests" };
    }
    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    if (!tripDetails) {
      return { error: "No trip details found" };
    }
    const city = tripDetails.city;
    const activities = tripDetails.activities;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${chatLocPrompt}`,
        },
        {
          role: "user",
          content: `${city} ${activities}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;

    const cityLocations = responseText?.split(", ");

    return {
      cityLocations,
    };
  } catch (error) {
    return {
      error: "Internal error",
    };
  }
}

export async function getCityDescription() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const ipAddress = await getIpAdress();

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 3) {
      return { rateLimit: "Too many requests" };
    }

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    if (!tripDetails) {
      return {
        error: "No trip details found",
      };
    }

    const city = tripDetails.city;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${chatDescPrompt}`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;

    return {
      responseText,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: "Internal error",
    };
  }
}
