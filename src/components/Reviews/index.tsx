import { useEffect, useState } from "react";
import { DBPinPopup } from "@components/PinPopup";
import { SvgButton } from "@components/SvgButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Vehicle } from "@apptypes/vehicle";
import { UserReview } from "@components/UserReview";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { userName } from "@utils/userName";
dayjs.extend(relativeTime);

type ReviewsListProps = {
  pinData: DBPinPopup;
  vehicles: Vehicle[];
};

export const Reviews = ({ pinData, vehicles }: ReviewsListProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const supabase = createClientComponentClient();
  console.log("pinData", pinData);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*, users(id,email)")
        .eq("station_id", pinData.ID);
      setLoading(false);
      console.log("fetchReviews data", data);
      data && setData(data);

      if (data) {
        console.log("pinData.ID", pinData.ID);
        const { data: checkins, error: chError } = await supabase.rpc(
          "get_checkins_likes",
          { stationid: pinData.ID }
        );
        console.log("checkins,chError", checkins, chError);
      }
    };
    fetchReviews();
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

            return (
              <UserReview
                key={checkin.id}
                userName={userName(checkin as any)}
                userCar={vehicleName}
                time={hoursAgo}
                stars={checkin.overall_rating}
                comment={checkin.comments}
                handleLikeClick={async () => {
                  const {
                    data: { user },
                  } = await supabase.auth.getUser();
                  if (!user) return;

                  const data = {
                    checkins_id: checkin.id,
                    user_id: user.id,
                  };
                  console.log("data", data);
                  const { error } = await supabase
                    .from("checkins_likes")
                    .insert(data);
                  console.log("error", error);
                  //refetch likes????
                }}
              />
            );
          })}
      </div>
    </div>
  );
};
