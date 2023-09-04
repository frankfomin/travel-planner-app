import { Message } from "@/lib/validators/message";
import { create } from "zustand";

type allMessages = {
  city: string;
  activites: string[];
};
type Store = {
  city: string;
  setCity: (city: string) => void;
  message: any;
  setMessage: (message: any) => void;
  activities: string[];
  setActivities: (activities: string[]) => void;
  allMessages: allMessages[];
  setAllMessages: (allMessages: allMessages[]) => void;
};

//    setActivities([...activities, newActivity]);

//message, user choices, city
export const useStore = create<Store>((set) => ({
  city: "",
  setCity: (city: string) => set({ city }),
  message: "",
  setMessage: (message: string) => set({ message }),
  activities: [],
  setActivities: (activities) => set({ activities }),
  allMessages: [],
  setAllMessages: (allMessages: allMessages[]) => set({ allMessages }),
}));
