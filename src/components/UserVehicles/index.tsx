"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Vehicle } from "@apptypes/vehicle";

export const UserVehicles = () => {
  const supabase = createClientComponentClient();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadAllVehicles();
  }, []);

  const loadAllVehicles = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("user_vehicles")
      .select("*, vehicles(*)")
      .eq("userid", user?.id);

    if (error) {
      console.log(error);
    } else {
      console.log("data", data);
      setVehicles(data as any);
    }
  };

  const handleRemoveVehicle = async (vehicleId: number) => {
    console.log("vehicleId", vehicleId);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && user.id !== null) {
      const { error } = await supabase
        .from("user_vehicles")
        .delete()
        .eq("id", vehicleId);

      console.log("error", error);
      if (!error) {
        loadAllVehicles();
      }
    }
  };

  if (vehicles.length === 0) {
    return <div className="flex flex-col gap-3">Loading vehicles</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      <table className="table-auto border border-gray-300">
        
        <tbody>
          {vehicles.map((vehicle: any) => {
            const veh = vehicle.vehicles as Vehicle;
            return (
              <tr key={vehicle.id}>
                <td className="border">{veh.vehicle}</td>
                <td
                  className="border text-center select-none cursor-pointer"
                  onClick={() => handleRemoveVehicle(vehicle.id)}
                >
                  Remove
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
