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

type Review = {
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
