"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redis } from "../redis";
import {
  chatDescPrompt,
  chatLocPrompt,
} from "@/helpers/constants/chatbot-prompt";
import OpenAI from "openai";
import { AutocompleteResult } from "@/types";

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

export async function findCitiesFromText(cityName: string) {
  try {
    if (cityName.length === 0) {
      return null;
    }
    type UniqueMainTexts = { [key: string]: boolean };
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=%28cities%29&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    console.log("RES", res);

    const city: AutocompleteResult[] = res.data.predictions;
    console.log("DATA", res.data.predictions);
    // Create an object to keep track of unique main_text values
    const uniqueMainTexts: UniqueMainTexts = {};

    // Filter out duplicate entries based on main_text
    const uniquePredictions = city.filter((prediction) => {
      if (!uniqueMainTexts[prediction.structured_formatting.main_text]) {
        uniqueMainTexts[prediction.structured_formatting.main_text] = true;
        return true;
      }
      return false;
    });

    return {
      uniquePredictions,
    };
  } catch (error) {
    return null;
  }
}

export async function getActivites({
  city,
  companion,
}: {
  city: string;
  companion: string;
}) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Please generate atleast 10 activities for ${city}. The user is travelling with ${companion} so you should adapt the activities to fit that target group. Please seperate each activity 
        with a comma.The activity should only be one word. For example: "hiking, swimming, biking" no exceptions in how you write it consistently use the same format always respond with activity name and then a comma and then the next activity.`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;
    const activites = responseText?.split(", ");

    return {
      activites,
    };
  } catch (error) {
    return {
      error: "Internal error",
    };
  }
}

export async function getCityBias() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const ipAddress = "192.186.12.11";

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 100) {
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
    const cookie = cookies();
    const userId = cookie.get("userId");

    const ipAddress = "192.186.12.11";

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 100) {
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

    const ipAddress = "192.186.12.11";

    const currentRequestCount = await redis.incr(ipAddress);

    if (currentRequestCount > 100) {
      return { rateLimit: "Too many requests" };
    }

    const cachedLoaction = await redis.hgetall(`location:${userId?.value}`);

    if (cachedLoaction?.cityDescription) {
      return {
        responseText: cachedLoaction.cityDescription as string,
      };
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

    await redis.hmset(`location:${userId?.value}`, {
      cityDescription: responseText,
    });

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
