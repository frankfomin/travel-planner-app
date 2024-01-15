import { is } from "drizzle-orm";
import { User } from "next-auth";

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

export type savedReview = {
  id: string;
  text: string;
  rating: string;
  tripId: string;
  locationId: string;
  author_name: string;
  relative_time_description: string | null;
  profile_photo_url: string | null;
  author_url: string | null;
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
  locationId?: string;
  tripId?: string;
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

type LocationDetails = {
  name: string;
  photos: any[]; // You might want to define a more specific type for photos
  opening_hours?: Record<string, any>; // You might want to define a more specific type for opening hours
  rating?: number;
  reviews?: any[]; // You might want to define a more specific type for reviews
};

export type Location = {
  details: LocationDetails;
  locDescription: string;
};

export type ExtendedSession = User & {
  isOAuth: boolean;
  provider: string;
};

export type city = {
  photo: Photo;
  cityDescription: string;
  city: string;
};

export type Details = {
  name: string;
  rating: number;
  opening_hours: {
    open_now: boolean;
    periods: {
      close: {
        day: number;
        time: string;
      };
      open: {
        day: number;
        time: string;
      };
    }[];
    weekday_text: string[];
  };
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  reviews: {
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
  }[];
};

type locationDetailsParams = {
  location: string;
  lat: number;
  lng: number;
  locationCount: number;
};

type Trip =
  | {
      city: string | null;
      photo_reference: string;
      width: number;
      height: number;
      description: string | null;
      id: string;
      name: string;
      userId: string;
      created_at: Date;
    }
  | undefined;

type LocationAndTrip =
  | {
      id: string;
      name: string;
      description: string | null;
      rating: string | null;
      photos: unknown;
      tripId: string;
      opening_hours: unknown;
      trip: {
        width: number;
        height: number;
        id: string;
        photo_reference: string;
        city: string | null;
        created_at: Date;
        description: string | null;
        name: string;
        userId: string;
      };
      reviews: savedReview[];
    }
  | undefined;

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
