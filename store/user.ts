import { create } from "zustand";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { UserInfo } from "@apptypes/user";

export interface State {
  user: UserInfo;
}

interface Action {
  setUserData: (userData: State) => void;
}

export const useUserStore = create<State & Action>((set) => ({
  user: {
    id: 0,
    name: "",
    email: "",
    picture: "",
  },
  setUserData: (userData) => set((state) => ({ ...userData })),
}));
