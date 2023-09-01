import { create } from "zustand";

type Store = {
  city: string;
  setCity: (city: string) => void;
  message: string;
  setMessage: (message: string) => void;
  activities: string[]; // Corrected key name
  setActivities: (activities: string[]) => void; // Corrected key name
};

//    setActivities([...activities, newActivity]);

//message, user choices, city
export const useStore = create<Store>((set) => ({
  city: "",
  setCity: (city: string) => set({ city }),
  message: "",
  setMessage: (message: string) => set({ message }),
  activities: [], // Corrected key name
  setActivities: (activities) => set({ activities }), // Corrected key name
}));
