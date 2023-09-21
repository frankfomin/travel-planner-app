import { Message } from "@/lib/validators/message";
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
};

export const dataFromApi = create<dataFromApi>((set) => ({
  cityDesc: "",
  setCityDesc: (cityDesc: string) => set({ cityDesc }),
  locations: "",
  setLocations: (locations: string) => set({ locations }),
}));
