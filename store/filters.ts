import { create } from "zustand";

interface State {
  filters: Map<string, string[]>;
}

interface Action {
  updateFilter: (filterIndex: string, updatedFiltersList: string[]) => void;
}

// Create your store, which includes both state and (optionally) actions
export const useFiltersStore = create<State & Action>((set) => ({
  filters: new Map(),
  updateFilter: (filterIndex, updatedFiltersList) =>
    set((state) => {
      const filters = state.filters;
      filters.set(filterIndex, updatedFiltersList);
      return { filters };
    }),
}));
