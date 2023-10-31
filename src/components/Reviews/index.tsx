import { useEffect, useState } from "react";
import { DBPinPopup } from "@components/PinPopup";
import { SvgButton } from "@components/SvgButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Vehicle } from "@apptypes/vehicle";
import { UserReview } from "@components/UserReview";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type CheckinsListProps = {
  pinData: DBPinPopup;
  vehicles: Vehicle[];
};

export const Reviews = ({ pinData, vehicles }: CheckinsListProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const supabase = createClientComponentClient();
  console.log("supabse", supabase);
  useEffect(() => {
    const fetchCheckins = async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*, users(id,email)")
        .eq("station_id", pinData.ID);
      setLoading(false);
      console.log("data", data);
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

            const hoursAgo = dayjs(checkin.created_at).fromNow();

            const userName = () => {
              if (checkin.anonymous) return "Anonymous";
              const email = checkin.users?.email.split("@");
              if (email) {
                return email[0];
              }
              return "Unknown";
            };

            return (
              <UserReview
                key={checkin.id}
                userName={userName()}
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
