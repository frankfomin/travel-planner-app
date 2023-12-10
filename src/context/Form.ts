import { create } from "zustand";

type formContext = {
  step: number;
  formData: {
    cityName: string;
    placeId: string;
    date: {
      from: Date;
      to: Date;
    }
    activities: string[];
    companions: string;
  };
  nextStep: () => void | { step: number };
  prevStep: () => void | { step: number };
  updateData: (data: Partial<formContext["formData"]>) => void;
};

export const formContext = create<formContext>((set) => ({
  step: 1,
  formData: {
    cityName: "",
    placeId: "",
    date: {
      from: new Date(),
      to: new Date(),
    },
    activities: [],
    companions: "",
  },
  nextStep: () =>
    set((state) => {
      if (state.step === 4) {
        return state;
      }
      return { step: state.step + 1 };
    }),
  prevStep: () =>
    set((state) => {
      if (state.step === 1) {
        return state;
      }
      return { step: state.step - 1 };
    }),
  updateData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
