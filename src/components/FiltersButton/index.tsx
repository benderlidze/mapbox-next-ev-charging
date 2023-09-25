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
          <div
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <img src="/icons/close.svg" alt="" width={40} />
          </div>
          <FilterItems
            title="Charger type"
            parameter="ev_charging_level"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "Level 1", value: "1" },
              { displayName: "Level 2", value: "2" },
              { displayName: "DC Fast", value: "dc_fast" },
            ]}
          />
          <FilterItems
            title="Connector type"
            parameter="ev_connector_type"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "NEMA 14-50", value: "NEMA1450" },
              { displayName: "NEMA 5-15", value: "NEMA515" },
              { displayName: "NEMA 5-20", value: "NEMA520" },
              { displayName: "J1772", value: "J1772" },
              { displayName: "CCS", value: "J1772COMBO" },
              { displayName: "CHAdeMO", value: "CHADEMO" },
              { displayName: "Tesla", value: "TESLA" },
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
