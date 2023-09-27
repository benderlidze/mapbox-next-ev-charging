import { create } from "zustand";
import { Feature, Geometry, GeoJsonProperties } from "geojson";

export interface State {
  route: Feature<Geometry, GeoJsonProperties>[];
}

interface Action {
  updateRoute: (route: Feature<Geometry, GeoJsonProperties>[]) => void;
}

// Create your store, which includes both state and (optionally) actions
export const useDirectionsStore = create<State & Action>((set) => ({
  route: [],
  updateRoute: (route) => set((state) => ({ route: route })),
}));
