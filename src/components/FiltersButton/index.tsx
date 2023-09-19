"use client";
import { useState } from "react";
import { FilterItems } from "@components/FilterItems";

export const FiltersButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonCLick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={handleButtonCLick}
        className="p-2 border rounded-md  cursor-pointer hover:bg-gray-100 select-none"
      >
        Filters
      </div>
      {isOpen && (
        <div className="w-10/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-90 bg-white border rounded-xl shadow-md p-4">
          FILTERS
          <FilterItems
            title="Charger type"
            param="ev_charging_level"
            list={["Level 1", "DC fast charge"]}
          />
          <FilterItems
            title="Connector type"
            param="ev_network"
            list={[
              "All",
              "NEMA1450",
              "NEMA515",
              "CMADEMO",
              "TESLA",
              "NEMO520",
              "J1772",
              "J1772COMBO",
            ]}
          />
        </div>
      )}
    </>
  );
};
