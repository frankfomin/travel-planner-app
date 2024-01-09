import { create } from "zustand";

type allMessages = {
  city: string;
  activites: string[];
};

type dataToApi = {
  placeId: string;
  setPlaceId: (place_id: string) => void;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
  city: string;
  setCity: (city: string) => void;
  message: any;
  setMessage: (message: any) => void;
  activities: string[];
  setActivities: (activities: string[]) => void;
};

export const dataToApi = create<dataToApi>((set) => ({
  placeId: "",
  setPlaceId: (placeId: string) => set({ placeId }),
  isSubmitted: false,
  setIsSubmitted: (isSubmitted: boolean) => set({ isSubmitted }),
  city: "",
  setCity: (city: string) => set({ city }),
  message: "",
  setMessage: (message: string) => set({ message }),
  activities: [],
  setActivities: (activities) => set({ activities }),
}));

type dataFromApi = {
  cityDesc: string;
  setCityDesc: (cityDesc: string) => void;
  locations: string;
  setLocations: (locations: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
};

export const dataFromApi = create<dataFromApi>((set) => ({
  cityDesc: "",
  setCityDesc: (cityDesc: string) => set({ cityDesc }),
  locations: "",
  setLocations: (locations: string) => set({ locations }),
  userId: "",
  setUserId: (userId: string) => set({ userId }),
}));

type pageIndex = {
  prevIndex: number;
  setPrevIndex: (prevIndex: number) => void;
  index: number;
  setIndex: (index: number) => void;
};

export const pageIndex = create<pageIndex>((set) => ({
  prevIndex: 0,
  setPrevIndex: (prevIndex: number) => set({ prevIndex }),
  index: 0,
  setIndex: (index: number) => set({ index }),
}));

type date = {
  from: string | null;
  to: string | null;
  date: string | null;
  setDate: (date: string) => void;
};

export const dateContext = create<date>((set) => ({
  from: null,
  to: null,
  date: null,
  setDate: (date: string) => set({ date }),
}));

type travellingWith = {
  travellingWith: string;
  setTravellingWith: (travellingWith: string) => void;
};

export const travellingWithContext = create<travellingWith>((set) => ({
  travellingWith: "",
  setTravellingWith: (travellingWith: string) => set({ travellingWith }),
}));

type activities = {
  activities: string[];
  setActivities: (activities: string[]) => void;
};

export const activitiesContext = create<activities>((set) => ({
  activities: [],
  setActivities: (activities: string[]) => set({ activities }),
}));
