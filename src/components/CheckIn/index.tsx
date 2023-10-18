import { Vehicle } from "@apptypes/vehicle";
import { ChargerType, ChargerTypes } from "@components/ChargerTypes";
import { PinProps } from "@components/PinPopup";
import { StarRating } from "@components/StarRating";
import { ToggleSwitcher } from "@components/ToggleSwitcher";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CheckInProps {
  pin: PinProps;
  vehicles: Vehicle[];
}

export const CheckIn = ({ pin, vehicles }: CheckInProps) => {
  const supabase = createClientComponentClient();
  const { register, handleSubmit } = useForm();
  const [starRating, setStarRating] = useState(0);
  const [selectedType, setSelectedType] = useState<ChargerType | undefined>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log("data===>>>>", data);
        console.log("selectedType", selectedType);

        let { data: ev_connectors } = await supabase
          .from("ev_connectors")
          .select("id")
          .eq("ev_connector_type", selectedType);

        console.log("results", ev_connectors);
        const connectorId = ev_connectors ? ev_connectors[0].id : null;

        const dbData = {
          ...data,
          overall_rating: starRating,
          plug_type: connectorId,
        };

        console.log("dbData", dbData);
        const { error } = await supabase.from("checkins").insert({ ...dbData });
        console.log("error", error);
      })}
    >
      <div
        className="flex flex-col gap-2 overflow-auto max-h-[300px] 
    tall:overflow-visible tall:max-h-screen "
      >
        <div className="flex flex-row justify-between items-center">
          <select
            {...register("vehicle_id")}
            className="w-full p-2 bg-gray-300 rounded-2xl border-none"
          >
            <option value="">Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Overall rating</div>
          <div className="text-sm">
            <StarRating
              onChange={(val) => {
                console.log("rating changed", val);
                setStarRating(val);
              }}
              isEdit={true}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Able to charge</div>
          <div className="text-sm">
            <ToggleSwitcher register={register("charged")} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Max charge rate</div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="KWs"
              {...register("max_charge_rate")}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Number of working plugs</div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="num"
              {...register("working_chargers")}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm font-bold">Plug type</div>
          <div className="flex flex-row">
            <ChargerTypes
              size={30}
              selectedType={selectedType}
              types={pin.ev_connector_types as ChargerType[]}
              setSelectedType={setSelectedType}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Wait in line to charge?</div>
          <div className="text-sm">
            <ToggleSwitcher register={register("wait_in_line")} />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm font-bold">Comments </div>
          <div className="">
            <textarea
              {...register("comments")}
              className="p-2 w-full min-h-[100px] bg-gray-300 rounded-2xl "
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <div className="">
            <input type="checkbox" {...register("anonymous")} />
          </div>
          <div className="text-xs">I wish to remain anonymous</div>
        </div>
        <div className="flex justify-center gap-1">
          <input
            type="submit"
            className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2"
          />
        </div>
      </div>
    </form>
  );
};
