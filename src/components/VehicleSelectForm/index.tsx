"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Vehicle } from "@apptypes/vehicle";

type VehicleSelectFormProps = {
  onAddVehicle: () => void;
};

export const VehicleSelectForm = ({ onAddVehicle }: VehicleSelectFormProps) => {
  const supabase = createClientComponentClient();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [year, setYear] = useState<number>();
  const [make, setMake] = useState<string>();
  const [model, setModel] = useState<string>();

  useEffect(() => {
    loadAllVehicles();
  }, []);

  const loadAllVehicles = async () => {
    const { data, error } = await supabase.from("vehicles").select("*");
    if (error) {
      console.log(error);
    } else {
      setVehicles(data as Vehicle[]);
    }
  };

  const handleAddVehicle = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session && data.session.user.id !== null) {
      console.log("!!!!!!!!!!!");
      const userId = data.session.user.id;
      console.log("userId", userId);

      const dbData = {
        userid: userId,
        vehicle_id: model,
      };

      console.log("dbData", dbData);

      const { error } = await supabase
        .from("user_vehicles")
        .insert({ ...dbData });

      if (!error) {
        // loadUserVehicles();
        onAddVehicle();
      }
    }
  };

  //   const loadUserVehicles = async () => {
  //     const { data: userData, error: userError } =
  //       await supabase.auth.getSession();

  //     // const { data, error } = await supabase
  //     //   .from("user_vehicles")
  //     //   .select("*")
  //     //   .eq("user_id", user?.id);
  //     // if (error) {
  //     //   console.log(error);
  //     // } else {
  //     //   setVehicles(data as Vehicle[]);
  //     // }
  //   };

  const handleModelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setModel(model);
  };

  if (vehicles.length === 0) {
    return <div className="flex flex-col gap-3">Loading vehicles</div>;
  }

  const years = [...new Set(vehicles.map((vehicle) => vehicle.year).sort())];
  const makes = [
    ...new Set(
      vehicles
        .filter((y) => {
          if (year && year !== 0) {
            return y.year === year;
          } else return y;
        })
        .map((vehicle) => vehicle.make)
    ),
  ];

  const models = [
    ...new Set(
      vehicles
        .filter((y) => {
          if (year && year !== 0) {
            return y.year === year;
          } else return y;
        })
        .filter((m) => {
          if (make && make !== "") {
            return m.make === make;
          } else return m;
        })
        .map((vehicle) => vehicle)
    ),
  ];

  const selectClassName = "p-2 bg-gray-300 rounded-md border-none";
  return (
    <div className="flex flex-row gap-1">
      <select
        key="year"
        name="year"
        className={selectClassName}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={`year-${year}`} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        name="make"
        key="make"
        className={selectClassName}
        onChange={(e) => setMake(e.target.value)}
      >
        <option value="">Select a make</option>
        {makes.map((make) => (
          <option key={`make-${make}`} value={make}>
            {make}
          </option>
        ))}
      </select>
      <select
        key="model"
        name="model"
        onChange={handleModelSelect}
        className={selectClassName}
      >
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={`model-${model.id}`} value={model.id}>
            {model.model}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddVehicle}
        className="p-2 border w-16 cursor-pointer select-none rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
      >
        Add
      </button>
    </div>
  );
};
