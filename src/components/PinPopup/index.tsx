import { useEffect, useState } from "react";
import { Tabs } from "@components/Tabs";
import { useDirectionsStore } from "@store/directions";
import { CheckIn } from "@components/CheckIn";
import { Vehicle } from "@apptypes/vehicle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { ChargerType } from "@components/ChargerTypes";
import { ChargerRating } from "@components/ChargerRating";

export type DBPinPopup = {
  "EV DC Fast Count": string;
  "EV Connector Types": ChargerType[];
  "EV Network": string;
  "EV Pricing": string;
  "Access Days Time": string;
  "EV DC Fast Num": number;
  "EV Level1 EVSE Num": number;
  "EV Level2 EVSE Num": number;
  "EV Network Web": string;
  "Station Name": string;
  "Street Address": string;
  "Facility Type": string;
  City: string;
  ZIP: string;
  ID: number;
  Latitude: number;
  Longitude: number;
  user_favorite_stations: any[];
};

interface PinPopupProps {
  pin: DBPinPopup;
  setSelectedPin: (pin: DBPinPopup | undefined) => void;
  vehicles: Vehicle[];
}

export const PinPopup = React.memo(
  ({ pin, setSelectedPin, vehicles }: PinPopupProps) => {
    const { updateRoute } = useDirectionsStore();
    const [checkInVisible, setCheckInVisible] = useState<boolean>(false);
    const [pinData, setPinData] = useState<DBPinPopup>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const supabase = createClientComponentClient();
    console.log("RENDER pinPopup", vehicles);

    useEffect(() => {
      (async () => {
        setIsLoading(true);
        await getPinData();
        setIsLoading(false);
      })();
    }, [pin.ID]);

    const getPinData = async () => {
      const { data: user } = await supabase.auth.getSession();
      const userId =
        user && user.session?.user.id
          ? user.session.user.id
          : "00000000-0000-0000-0000-000000000000";

      const pinId = pin.ID;
      const { data, error } = await supabase
        .from("ev_stations_gis")
        .select(
          `
          *,
          user_favorite_stations!left(station_id, user_id),
          facilities:facilities(
            "Facility"
          )
          `
        )
        .eq("ID", pinId)
        .eq("user_favorite_stations.user_id", userId);

      //supabase left join with where clause
      //
      // const { data, error } = await supabase
      // .from("ev_stations_gis")
      // .select(
      //   `
      //   *,
      //   user_favorite_stations!inner(station_id, user_id),
      //   facilities:facilities(
      //     "Facility"
      //   )
      //   `
      // )
      // .eq("ID", pinId)

      data &&
        data[0] &&
        setPinData({
          ...data[0],
          "Facility Type":
            data[0].facilities !== null ? data[0].facilities.Facility : "",
          "EV Connector Types":
            data[0]["EV Connector Types"] !== null
              ? (data[0]["EV Connector Types"].split(" ") as ChargerType[])
              : [],
        });
      console.log("data", data, error);
    };

    const handleLikeStationClick = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session && session.user;
      if (!user || user.id === null) return;
      if (pinData && pinData["user_favorite_stations"].length === 0) {
        //add to favorites
        const dbData = {
          station_id: pin.ID,
          user_id: user ? user.id : null,
        };
        const { error } = await supabase
          .from("user_favorite_stations")
          .insert({ ...dbData });
      } else {
        //remove from favorites
        const { error } = await supabase
          .from("user_favorite_stations")
          .delete()
          .eq("station_id", pin.ID)
          .eq("user_id", user.id);
      }
      getPinData();
    };

    const handleCheckInClick = () => {
      setCheckInVisible(!checkInVisible);
    };

    const handleGetDirectionsClick = () => {
      console.log("get directions");
      //get uuser position
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = `${position.coords.longitude},${position.coords.latitude}`;
        const destination = `${pin.Longitude},${pin.Latitude}`;

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

    const networkIMage = (network: DBPinPopup["EV Network"]) => {
      const nameToNetwork = {
        "Blink Network": "Blink Network.jpg",
        "ChargePoint Network": "ChargePoint Network.jpg",
        "Electrify America": "Electrify America.jpg",
        "EV Connect": "EV Connect.jpg",
        "eVgo Network": "eVgo Network.jpg",
        Tesla: "Tesla.png",
        "Tesla Destination": "Tesla.png",
      };

      if (nameToNetwork[network as keyof typeof nameToNetwork]) {
        return (
          "ev-images/" + nameToNetwork[network as keyof typeof nameToNetwork]
        );
      } else {
        return "ev-images/other.jpg";
      }
    };

    if (isLoading)
      return (
        <div className="w-80 flex items-center justify-center min-h-[41rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-100 bg-white shadow-md ">
          Loading...
        </div>
      );
    if (!pinData)
      return (
        <div className="w-80 min-h-[41rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-100 bg-white shadow-md ">
          No data
        </div>
      );

    const likeSrc =
      pinData["user_favorite_stations"] &&
      pinData["user_favorite_stations"].length > 0
        ? "/icons/like-filled.svg"
        : "/icons/like-outline.svg";

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
          <img src={networkIMage(pinData["EV Network"])} width={"100%"} />
          <div className="p-4">
            <div className="text-lg font-bold flex flex-row justify-between">
              <div className="w-10/12">{pinData["Station Name"]}</div>
              <div className="flex justify-center align-middle ">
                <img
                  className="cursor-pointer "
                  src={likeSrc}
                  alt=""
                  style={{ width: 30, height: 30 }}
                  onClick={handleLikeStationClick}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between ">
              <div>{pinData["Street Address"]}</div>
              <div>
                <a
                  target="_blank"
                  href={pinData["EV Network Web"]}
                  className=" underline text-[#FF4166] font-bold"
                >
                  {pinData["EV Network"]}
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-start align-middle space-x-4 my-3 ">
              <ChargerRating pinData={pinData} />
            </div>
            {/* <div className="flex flex-row justify-start align-middle space-x-4">
              <div className="select-none w-fit flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer px-2 ">
                Available
              </div>
              <div className="text-sm">1.6 km</div>
              <div className="text-sm">5 mins</div>
            </div> */}

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
            {checkInVisible && <CheckIn vehicles={vehicles} pin={pinData} />}
            {!checkInVisible && <Tabs pinData={pinData} vehicles={vehicles} />}
          </div>
        </div>
      </div>
    );
  }
);
PinPopup.displayName = "PinPopup";
