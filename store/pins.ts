import { create } from "zustand";

interface State {
  pins: [];
}
interface Action {
  updatePins: (pins: []) => void;
}

// Create your store, which includes both state and (optionally) actions
export const usePinsStore = create<State & Action>((set) => ({
  pins: [],
  updatePins: (pinsArray) =>
    set((state) => {
      return { pins: pinsArray };
    }),
}));
