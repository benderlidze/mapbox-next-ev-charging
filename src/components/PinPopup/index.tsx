import { use, useEffect, useState } from "react";
import { Tabs } from "../Tabs";

export interface PinProps {
  latitude: number;
  longitude: number;
  city: string;
  zip: string;
  ev_connector_types: string[];
  station_name: string;
  street_address: string;
  ev_network: string;
  ev_network_web: string;
  ev_pricing: string;
  access_days_time: string;

  ev_dc_fast_num: number;
  ev_level1_evse_num: number;
  ev_level2_evse_num: number;
}

interface PinPopupProps {
  pin: PinProps;
  setSelectedPin: (pin: PinProps | undefined) => void;
}

export const PinPopup = ({ pin, setSelectedPin }: PinPopupProps) => {
  return (
    <div className="w-80 min-h-[41rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-90 bg-white shadow-md ">
      <div
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={() => {
          setSelectedPin(undefined);
        }}
      >
        <img src="/icons/close.svg" alt="" width={40} />
      </div>
      <div className="flex flex-col">
        <img
          src="https://media.drivingelectric.com/image/private/s--AymR0BqQ--/f_auto,t_primary-image-desktop@1/v1597772418/drivingelectric/2018-11/2cteslamodel3.jpg"
          width={"100%"}
        />
        <div className="p-4">
          <div className="text-lg font-bold">{pin.station_name}</div>
          <div className="flex flex-row justify-between ">
            <div>{pin.street_address}</div>
            <div>
              <a
                target="_blank"
                href={pin.ev_network_web}
                className=" underline text-[#FF4166] font-bold"
              >
                {pin.ev_network}
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-start align-middle space-x-4 my-3 ">
            <div className="flex flex-row align-middle gap-1">
              <img src="/icons/star.svg" alt="" width={12} />
              <img src="/icons/star.svg" alt="" width={12} />
              <img src="/icons/star.svg" alt="" width={12} />
              <img src="/icons/star.svg" alt="" width={12} />
              <img src="/icons/star.svg" alt="" width={12} />
            </div>
            <div className="text-sm">4.5 </div>
            <div className="text-sm">(128 reviews)</div>
          </div>
          <div className="flex flex-row justify-start align-middle space-x-4">
            <div className="select-none w-fit flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer px-2 ">
              Available
            </div>
            <div className="text-sm">1.6 km</div>
            <div className="text-sm">5 mins</div>
          </div>

          <div className="select-none flex justify-center   text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2">
            Get direction
          </div>

          <Tabs pin={pin} />
        </div>
      </div>
    </div>
  );
};
