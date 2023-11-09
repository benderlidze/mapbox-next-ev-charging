import { Vehicle } from "@apptypes/vehicle";
import { ChargerType, ChargerTypes } from "@components/ChargerTypes";
import { DBPinPopup } from "@components/PinPopup";
import { StarRating } from "@components/StarRating";
import { ToggleSwitcher } from "@components/ToggleSwitcher";
import { useUserStore } from "@store/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CheckInProps {
  pin: DBPinPopup;
  vehicles: Vehicle[];
}

export const CheckIn = ({ pin, vehicles }: CheckInProps) => {
  const supabase = createClientComponentClient();
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [starRating, setStarRating] = useState<number>(3);
  const [selectedType, setSelectedType] = useState<ChargerType | undefined>(
    pin["EV Connector Types"][0]
  );
  const [success, setSuccess] = useState(false);
  const [userVehicles, setUserVehicles] = useState<any[]>([]);

  console.log("user!!!", user);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: vehicles, error } = await supabase
        .from("user_vehicles")
        .select("*")
        .eq("userid", user?.id);
      if (!error) {
        const vehiclesArray = vehicles.map((v) => v.vehicle_id);
        setUserVehicles(vehiclesArray);
      }
    };
    fetchUserVehicles();
  }, []);

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="text-3xl font-bold">Thank you!</div>
        <div className="text-lg flex justify-center">
          Your feedback has been submitted.
        </div>
      </div>
    );
  }

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

        const {
          data: { user },
        } = await supabase.auth.getUser();

        console.log("data.vehicle_id============>>>>", data.vehicle_id);
        const dbData = {
          ...data,
          overall_rating: starRating,
          plug_type: connectorId,
          station_id: pin.ID,
          vehicle_id: data.vehicle_id ? data.vehicle_id : null,
          user_id: user ? user.id : null,
        };

        console.log("dbData", dbData);

        const { error } = await supabase.from("checkins").insert({ ...dbData });
        console.log("error", error);

        if (!error) {
          setSuccess(true);
        }
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
            {vehicles
              .filter((v) => {
                if (userVehicles && userVehicles.length > 0) {
                  return userVehicles.includes(v.id);
                }
                return true;
              })
              .map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicle}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-bold">Overall rating*</div>
          <div className="text-sm">
            <StarRating
              value={starRating}
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
          <div
            className="text-sm font-bold"
            {...(errors.max_charge_rate &&
              errors.max_charge_rate.type === "required" && {
                style: { color: "red" },
              })}
          >
            Max charge rate*
          </div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16 p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="KWs"
              {...register("max_charge_rate", { required: true })}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div
            className="text-sm font-bold"
            {...(errors.working_chargers &&
              errors.working_chargers.type === "required" && {
                style: { color: "red" },
              })}
          >
            Number of working plugs*
          </div>
          <div className="text-sm">
            <input
              type="text"
              className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
              placeholder="num"
              {...register("working_chargers", { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm font-bold">Plug type</div>
          <div className="flex flex-row">
            <ChargerTypes
              size={30}
              selectedType={selectedType}
              types={pin["EV Connector Types"] as ChargerType[]}
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
          {user && user.id !== 0 ? (
            <input
              type="submit"
              className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2"
            />
          ) : (
            <button
              disabled
              className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gray-500 cursor-pointer p-2 width-fit mt-2 mb-2"
            >
              Sign in to submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
