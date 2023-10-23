"use client";
import { useEffect, useState } from "react";
import { FilterItems } from "@components/FilterItems";
import { useFiltersStore } from "@store/filters";
import { usePinsStore } from "@store/pins";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DBPinPopup } from "../PinPopup";

export const FiltersButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { filters, updateFilter } = useFiltersStore();

  const handleButtonCLick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilters = async () => {
    console.log("filters", filters);
    // setIsLoading(true);
    const filtersData = Array.from(filters)
      .filter((d) => d[1].length > 0)
      .map((d) => {
        return d[1].includes("all")
          ? `${d[0]}=all`
          : `${d[0]}=${d[1].join(",")}`;
      });
    console.log("filtersData", filtersData);

    // fetch("/api/load-pins/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(filtersData),
    // })
    //   .then((res) => res.json())
    //   .then((results) => {
    //     console.log("results", results);
    //     console.log("URL===========>>>>", results.url);

    //     updatePins(results.data.fuel_stations);
    //     setIsLoading(false);
    //     setIsOpen(false);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
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
              { displayName: "Level 1", value: "EV Level1 EVSE Num" },
              { displayName: "Level 2", value: "EV Level2 EVSE Num" },
              { displayName: "DC Fast", value: "EV DC Fast Count" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
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
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Charging network"
            parameter="ev_network"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "7Charge", value: "7CHARGE" },
              { displayName: "AddÉnergie", value: "AddÉnergie Technologies" },
              { displayName: "AmpUp", value: "AMPUP" },
              { displayName: "BC Hydro", value: "BCHYDRO" },
              { displayName: "Blink", value: "Blink Network" },
              { displayName: "ChargeLab", value: "CHARGELAB" },
              { displayName: "ChargePoint", value: "ChargePoint Network" },
              { displayName: "ChargeUp", value: "CHARGEUP" },
              { displayName: "Chargie", value: "CHARGIE" },
              { displayName: "CircleK Charge", value: "CIRCLE_K" },
              {
                displayName: "CircleK/Couche-Tard Recharge",
                value: "COUCHE_TARD",
              },
              {
                displayName: "Circuit électrique",
                value: "Circuit électrique",
              },
              { displayName: "eCharge Network", value: "eCharge Network" },
              { displayName: "Electrify America", value: "Electrify America" },
              { displayName: "Electrify Canada", value: "Electrify Canada" },
              { displayName: "EV Charging Solutions", value: "EVCS" },
              { displayName: "EV Connect", value: "EV Connect" },
              { displayName: "evGateway", value: "EVGATEWAY" },
              { displayName: "EVgo", value: "eVgo Network" },
              { displayName: "EV Range", value: "EVRANGE" },
              { displayName: "FLASH", value: "FLASH" },
              { displayName: "FLO", value: "FLO" },
              { displayName: "FPL EVolution", value: "FPLEV" },
              { displayName: "Francis", value: "FCN" },
              { displayName: "Graviti Energy", value: "GRAVITI_ENERGY" },
              { displayName: "Ivy", value: "IVY" },
              { displayName: "Livingston Energy Group", value: "LIVINGSTON" },
              { displayName: "Non-Networked", value: "Non-Networked" },
              { displayName: "Noodoe", value: "NOODOE" },
              { displayName: "OpConnect", value: "OpConnect" },
              { displayName: "Petro-Canada", value: "PETROCAN" },
              { displayName: "PowerFlex", value: "POWERFLEX" },
              { displayName: "Red E Charging", value: "RED_E" },
              {
                displayName: "Rivian Adventure Network",
                value: "RIVIAN_ADVENTURE",
              },
              { displayName: "Rivian Waypoints", value: "RIVIAN_WAYPOINTS" },
              { displayName: "SemaConnect", value: "SemaCharge Network" },
              { displayName: "Shell Recharge", value: "SHELL_RECHARGE" },
              {
                displayName: "Sun Country Highway",
                value: "Sun Country Highway",
              },
              { displayName: "Swtch Energy", value: "SWTCH" },
              { displayName: "Tesla Destination", value: "Tesla Destination" },
              { displayName: "Tesla Supercharger", value: "Tesla" },
              { displayName: "Universal EV Chargers", value: "UNIVERSAL" },
              { displayName: "Volta", value: "Volta" },
              { displayName: "WAVE", value: "WAVE" },
              { displayName: "ZEF Network", value: "ZEFNET" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Status"
            parameter="status_code"
            list={[
              { displayName: "Available", value: "E" },
              { displayName: "Planned", value: "P" },
              { displayName: "Temporarily Unavailable", value: "T" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Status"
            parameter="ev_pricing"
            list={[
              { displayName: "Free", value: "Free" },
              { displayName: "Paid", value: "Paid" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
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
