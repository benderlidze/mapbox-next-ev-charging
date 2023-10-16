import { Vehicle } from "@apptypes/vehicle";
import { ChargerType, ChargerTypes } from "@components/ChargerTypes";
import { PinProps } from "@components/PinPopup";
import StarRating from "@components/StarRating";
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

  const handleFormSubmit = () => {
    handleSubmit((data) => {
      console.log("data===>>>>", data);

      // const { error } = await supabase
      //   .from("checkins")
      //   .insert({ comments: comment });
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("data===>>>>", data);

        // const { error } = await supabase
        //   .from("checkins")
        //   .insert({ comments: comment });
      })}
    >
      <div
        className="flex flex-col gap-2 overflow-auto max-h-[300px] 
    tall:overflow-visible tall:max-h-screen "
      >
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl">Vehicle Type</div>
          <div className="text-sm">
            <select
              {...register("vehicle_id")}
              className="w-32 p-2 bg-gray-300 rounded-2xl border-none"
            >
              <option value="">Select</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicle}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl">Overall rating</div>
          <div className="text-sm">
            <StarRating rating={3} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">Charging speed</div>
          <div className="text-sm">
            <StarRating rating={4} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">Reliability</div>
          <div className="text-sm">
            <StarRating rating={3} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">What was your maximum charge rate (kW)?</div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="KWs"
              {...register("energy_consumed")}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">How many chargers were working?</div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="num"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">Charging time</div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="mins"
              {...register("charging_session_duration")}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-xl">Plug type</div>
          <div className="flex flex-row">
            <ChargerTypes types={pin.ev_connector_types as ChargerType[]} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">Were you able to charge your vehicle?</div>
          <div className="text-sm">
            <ToggleSwitcher />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm">
            Did you wait in line ( 5 mins) to charge?
          </div>
          <div className="text-sm">
            <ToggleSwitcher />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-xl">Comments </div>
          <div className="">
            <textarea
              {...register("comments")}
              className="p-2 w-full min-h-[100px] bg-gray-300 rounded-2xl "
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <div className="">
            <input type="checkbox" {...register("anonymous_flag")} />
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
