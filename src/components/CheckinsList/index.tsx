import { useEffect, useState } from "react";
import { DBPinPopup } from "@components/PinPopup";
import { UserCheckIn } from "@components/UserCheckIn";
import { SvgButton } from "@components/SvgButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Vehicle } from "@apptypes/vehicle";

type CheckinsListProps = {
  pinData: DBPinPopup;
  vehicles: Vehicle[];
};

export const CheckinsList = ({ pinData, vehicles }: CheckinsListProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const supabase = createClientComponentClient();

  console.log("vehicles", vehicles);

  useEffect(() => {
    const fetchCheckins = async () => {
      console.log("pinData.ID", pinData.ID);
      const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .eq("station_id", pinData.ID);
      setLoading(false);
      data && setData(data);
    };
    fetchCheckins();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-2 mt-4 border border-gray-00 rounded-lg bg-slate-100">
        <div className="flex flex-row-reverse">
          <SvgButton icon="/icons/filter.svg" onClick={() => {}} />
        </div>

        {loading && <div>Loading...</div>}

        {!loading &&
          data.length > 0 &&
          data.map((checkin: Checkin) => {
            const vehicle = vehicles.find((v) => v.id === checkin.vehicle_id);
            const vehicleName = vehicle ? vehicle.vehicle : "Unknown";
            const hoursAgo =
              Math.floor(
                (Date.now() - new Date(checkin.created_at).getTime()) /
                  1000 /
                  60 /
                  60
              ) + " hours ago";
              
            return (
              <UserCheckIn
                key={checkin.id}
                userName={checkin.user_id}
                userCar={vehicleName}
                time={hoursAgo}
                stars={checkin.overall_rating}
                comment={checkin.comments}
              />
            );
          })}
      </div>
    </div>
  );
};
