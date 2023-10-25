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
      const filters = new Map(state.filters);
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


// -- Drop the existing function
// DROP FUNCTION IF EXISTS stations_in_view(float, float, float, float);

// -- create database function to find stations in a specific box
// create or replace function stations_in_view(min_lat float, min_long float, max_lat float, max_long float)
// returns table (
//   "ID" public.ev_stations_gis."ID"%TYPE, 
//   "Station Name" public.ev_stations_gis."Station Name"%TYPE, 
//   "EV DC Fast Count" public.ev_stations_gis."EV DC Fast Count"%TYPE, 
//   "EV Level1 EVSE Num" public.ev_stations_gis."EV Level1 EVSE Num"%TYPE, 
//   "EV Level2 EVSE Num" public.ev_stations_gis."EV Level2 EVSE Num"%TYPE, 
//   "EV Connector Types" public.ev_stations_gis."EV Connector Types"%TYPE, 
//   "EV Network" public.ev_stations_gis."EV Network"%TYPE, 
//   "EV Pricing" public.ev_stations_gis."EV Pricing"%TYPE, 
//   "Status Code" public.ev_stations_gis."Status Code"%TYPE, 
//   "Latitude" float, 
//   "Longitude" float
//   )
// language sql
// as $$
// 	select "ID", "Station Name","EV DC Fast Count","EV Level1 EVSE Num","EV Level2 EVSE Num","EV Connector Types","EV Network","EV Pricing", "Status Code", ST_Y(location::geometry) as lat, ST_X(location::geometry) as long
// 	from public.ev_stations_gis
// 	where location && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)),4326)
// $$;