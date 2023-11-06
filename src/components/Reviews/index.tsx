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
  const [data, setData] = useState<any>({
    reviews: [],
    checkinsLikes: [],
  });
  const [userData, setUserData] = useState<any>([]);

  const supabase = createClientComponentClient();
  console.log("pinData", pinData);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user) {
      setUserData(user);
    }

    const { data, error } = await supabase
      .from("checkins")
      .select("*, users(id,email)")
      .eq("station_id", pinData.ID);
    setLoading(false);

    if (data) {
      const userid = user ? user.id : null;
      const { data: checkins, error: chError } = await supabase.rpc(
        "get_checkins_likes",
        { stationid: pinData.ID, userid: userid }
      );
      console.log("checkins,chError", checkins, chError);
      console.log("data, error", data, error);
      data &&
        setData({
          reviews: data,
          checkinsLikes: checkins,
        });
    }
  };

  return (
    <div>
      <div className="max-h-[300px] overflow-y-auto flex flex-col gap-4 p-2 mt-4 border border-gray-00 rounded-lg bg-slate-100">
        <div className="flex flex-row-reverse">
          <SvgButton icon="/icons/filter.svg" onClick={() => {}} />
        </div>

        {loading && <div>Loading...</div>}

        {!loading &&
          data.reviews.length > 0 &&
          data.reviews.map((checkin: Checkin) => {
            const likesData = data.checkinsLikes.find(
              (c: any) => c.checkins_id === checkin.id
            );

            const vehicle = vehicles.find((v) => v.id === checkin.vehicle_id);
            const vehicleName = vehicle ? vehicle.vehicle : "Unknown";
            const hoursAgo = dayjs(checkin.created_at).fromNow();

            console.log("userData.id", userData.id);

            const ableToLike =
              !likesData?.voted &&
              userData.id &&
              userData.id !== checkin.user_id; //do not vote for own comments and already voted comments

            return (
              <UserReview
                key={checkin.id}
                userName={userName(checkin as any)}
                userCar={vehicleName}
                time={hoursAgo}
                stars={checkin.overall_rating}
                comment={checkin.comments}
                likes={likesData?.likes_count || 0}
                ableToLike={ableToLike}
                handleLikeClick={async () => {
                  const data = {
                    checkins_id: checkin.id,
                    user_id: userData.id,
                  };
                  console.log("data", data);
                  const { error } = await supabase
                    .from("checkins_likes")
                    .insert(data);
                  console.log("error", error);
                  fetchReviews();
                  //refetch likes????
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

// rpc
// DROP FUNCTION  IF EXISTS get_checkins_likes (integer, uuid);
// -- create database function to find stores in a specific box
// create
// or replace function get_checkins_likes (stationid integer, userid uuid)
// returns table (checkins_id public.checkins.id%TYPE,likes_count integer, voted boolean)
// security definer
// language sql as $$
// SELECT
//     checkins.id ,
//     COUNT(checkins_likes.id) AS likes_count,
//     CASE
//         WHEN SUM(CASE WHEN checkins_likes.user_id = userid THEN 1 ELSE 0 END) > 0 THEN true
//         ELSE false
//     END AS user_vote_status
// FROM checkins
// LEFT JOIN checkins_likes ON checkins.id = checkins_likes.checkins_id
// WHERE
//   checkins.station_id = stationid
// GROUP BY checkins.id
// $$;
