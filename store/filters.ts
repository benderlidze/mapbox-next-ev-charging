import { create } from "zustand";

export interface FiltersState {
  filters: Map<string, string[]>;
}

interface Action {
  updateFilter: (filterIndex: string, filterValue: string) => void;
}

// Create your store, which includes both state and (optionally) actions
export const useFiltersStore = create<FiltersState & Action>((set) => ({
  filters: new Map(),
  // updateFilter: (filterIndex, updatedFiltersList) =>
  //   set((state) => {
  //     const filters = state.filters;
  //     //filters.set(filterIndex, updatedFiltersList);
  //     // filters.get(filterIndex)
  //     //   ? filters.delete(filterIndex)
  //     //   : filters.set(filterIndex, updatedFiltersList);
  //     if (filters.get(filterIndex)) {
  //       const selectedArray = filters.get(filterIndex);
  //       selectedArray?.push(updatedFiltersList[0]);
  //     } else {
  //       filters.set(filterIndex, updatedFiltersList);
  //     }
  //     return { filters };
  //   }),
  updateFilter: (filterIndex, filterValue) =>
    set((state) => {
      const filters = state.filters;
      console.log("filters", filters);
      if (filters.get(filterIndex)) {
        const selectedArray = filters.get(filterIndex);
        selectedArray?.includes(filterValue)
          ? selectedArray.splice(selectedArray.indexOf(filterValue), 1)
          : selectedArray?.push(filterValue);
      } else {
        filters.set(filterIndex, [filterValue]);
      }
      return { filters };
    }),
}));
