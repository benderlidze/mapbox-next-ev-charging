import { useEffect, useState } from "react";
import { DBPinPopup } from "@components/PinPopup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { BsStar, BsStarFill } from "@components/StarRating/icons";

type ChargerRatingProps = {
  pinData: DBPinPopup;
};

export const ChargerRating = ({ pinData }: ChargerRatingProps) => {
  const [data, setData] = useState<any>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    //TODO move to main DB query
    const fetchCheckins = async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*, users(id,email)")
        .eq("station_id", pinData.ID);
      data && setData(data);
    };
    fetchCheckins();
  }, []);

  if (data.length > 0) {
    const reviews = data.length;
    const avrRating =
      data.reduce((acc: number, curr: any) => {
        return acc + curr.overall_rating;
      }, 0) / reviews;
    const starsRating = Math.round(avrRating);
    const stars = [...Array(5).keys()].map((s, index) => {
      if (index >= starsRating) {
        return <BsStar key={index} style={{ color: "gray" }} />;
      }
      return <BsStarFill key={index} style={{ color: "red" }} />;
    });

    return (
      <>
        <div className="flex flex-row gap-1 items-center">{stars}</div>
        <div className="text-sm">{avrRating.toFixed(1)}</div>
        <div className="text-sm">({reviews} reviews)</div>
      </>
    );
  }

  //default
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <BsStar />
        <BsStar />
        <BsStar />
        <BsStar />
        <BsStar />
      </div>
      <div className="text-sm">0 </div>
      <div className="text-sm">(0 reviews)</div>
    </>
  );
};
