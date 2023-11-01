type location = {
  location_id: string;
  name: string;
};

type OpeningHoursPeriod = {
  close: {
    day: number;
    time: string;
  };
  open: {
    day: number;
    time: string;
  };
};

export type OpeningHours = {
  open_now?: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
};

export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type Review = {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
};

export type Place = {
  name: string;
  opening_hours?: OpeningHours;
  photos: Photo[];
  rating?: number;
  reviews: Review[];
  description: string;
};

export type AutocompleteResult = {
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

import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100),
});

export type TsignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type TsignInSchema = z.infer<typeof signInSchema>;

export const updateUserData = z
  .object({
    email: z.string().email(),
    name: z.string(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).max(100).optional(),
    confirmPassword: z.string().min(8).max(100).optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TupdateUserData = z.infer<typeof updateUserData>;

export const saveTripSchema = z.object({
  TripName: z.string().min(1).max(100),
});

export type TsaveTripSchema = z.infer<typeof saveTripSchema>;

type LocationDetails = {
  name: string;
  photos: any[]; // You might want to define a more specific type for photos
  opening_hours?: Record<string, any>; // You might want to define a more specific type for opening hours
  rating?: number;
  reviews?: any[]; // You might want to define a more specific type for reviews
};

export type Location = {
  locationDetails: LocationDetails;
  locationDescription: string;
};

export type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};
