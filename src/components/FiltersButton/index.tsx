"use client";
import { useState } from "react";
import { FilterItems } from "@components/FilterItems";
import { useFiltersStore } from "@store/filters";
import { usePinsStore } from "@store/pins";

export const FiltersButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filters = useFiltersStore((state) => state.filters);
  const updatePins = usePinsStore((state) => state.updatePins);

  const handleButtonCLick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilters = () => {
    console.log("filters", filters);
    setIsLoading(true);
    const filtersData = Array.from(filters).map((d) => {
      return `${d[0]}=${d[1].join(",")}`;
      //return { name: d[0], values: d[1] };
    });

    fetch("/api/load-pins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtersData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        updatePins(data.fuel_stations);

        setIsLoading(false);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div
        onClick={handleButtonCLick}
        className="p-2 border cursor-pointer select-none rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
      >
        Filters
      </div>
      {isOpen && (
        <div className="w-10/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-90 bg-white border rounded-xl shadow-md p-4">
          FILTERS
          <FilterItems
            title="Charger type"
            parameter="ev_charging_level"
            list={["Level 1", "dc_fast"]}
          />
          <FilterItems
            title="Connector type"
            parameter="ev_connector_type"
            list={[
              "All",
              "NEMA1450",
              "NEMA515",
              "CMADEMO",
              "TESLA",
              "NEMA520",
              "J1772",
              "J1772COMBO",
            ]}
          />
          <div
            onClick={handleFilters}
            className={`select-none ${
              isLoading ? "pointer-events-none" : ""
            } inline-block  text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit`}
          >
            {isLoading ? "Loading..." : "Show chargers"}
          </div>
        </div>
      )}
    </>
  );
};
