import { use, useEffect, useState } from "react";
import { Tabs } from "../Tabs";
import { useDirectionsStore } from "@store/directions";
import { CheckIn } from "../CheckIn";
export interface PinProps {
  id: number;
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
  const { updateRoute } = useDirectionsStore();
  const [checkInVisible, setCheckInVisible] = useState<boolean>(false);

  const handleCheckInClick = () => {
    setCheckInVisible(!checkInVisible);
  };
  const handleGetDirectionsClick = () => {
    console.log("get directions");
    //get uuser position
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = `${position.coords.longitude},${position.coords.latitude}`;
      const destination = `${pin.longitude},${pin.latitude}`;

      //&overview=full
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userPosition};${destination}?steps=true&geometries=geojson&access_token=` +
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      )
        .then((response) => response.json())
        .then((data) => {
          // Process the directions data and display it on the map or in your UI
          console.log(data);
          updateRoute(data.routes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(position);
    });
  };

  const allAvailableNetworks = [
    "SHELL_RECHARGE",
    "Non-Networked",
    "Volta",
    "EV Connect",
    "POWERFLEX",
    "ChargePoint Network",
    "OpConnect",
    "EVGATEWAY",
    null,
    "eVgo Network",
    "AMPUP",
    "EVCS",
    "Blink Network",
    "UNIVERSAL",
    "FCN",
    "Tesla",
    "ZEFNET",
    "Tesla Destination",
    "Electrify America",
    "CHARGELAB",
    "LIVINGSTON",
    "FLO",
    "FPLEV",
    "7CHARGE",
    "EVMATCH",
    "RIVIAN_WAYPOINTS",
    "RED_E",
    "SWTCH",
    "CIRCLE_K",
    "WAVE",
    "EVRANGE",
    "GRAVITI_ENERGY",
    "FLASH",
    "RIVIAN_ADVENTURE",
    "CHARGEUP",
    "JULE",
    "NOODOE",
    "CHARGIE",
    "LOOP",
    "REVEL",
  ];

  const networkIMage = (network: PinProps["ev_network"]) => {
    const nameToNetwork = {
      "Blink Network": "Blink Network.jpg",
      "ChargePoint Network": "ChargePoint Network.jpg",
      "Electrify America": "Electrify America.jpg",
      "EV Connect": "EV Connect.jpg",
      "eVgo Network": "eVgo Network.jpg",
      Tesla: "Tesla.png",
      "Tesla Destination": "Tesla.jpg",
    };

    if (nameToNetwork[network as keyof typeof nameToNetwork]) {
      return (
        "ev-images/" + nameToNetwork[network as keyof typeof nameToNetwork]
      );
    } else {
      return "ev-images/other.jpg";
    }
  };

  return (
    <div className="w-80 min-h-[41rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-100 bg-white shadow-md ">
      <div
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={() => {
          setSelectedPin(undefined);
        }}
      >
        <img src="/icons/close.svg" alt="" width={40} />
      </div>
      <div className="flex flex-col">
        <img src={networkIMage(pin.ev_network)} width={"100%"} />
        <div className="p-4">
          <div className="text-lg font-bold flex flex-row justify-between">
            <div className="w-10/12">{pin.station_name}</div>
            <div className="flex justify-center align-middle ">
              <img
                className="cursor-pointer "
                src="/icons/like-outline.svg"
                alt=""
                width={30}
              />
            </div>
          </div>
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

          <div className="flex flex-row gap-1">
            <div
              onClick={handleGetDirectionsClick}
              className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2"
            >
              Get directions
            </div>
            <div
              onClick={handleCheckInClick}
              className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2"
            >
              Check in
            </div>
          </div>
          {checkInVisible && <CheckIn pin={pin} />}
          {!checkInVisible && <Tabs pin={pin} />}
        </div>
      </div>
    </div>
  );
};
