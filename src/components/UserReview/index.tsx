import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserReviewProps {
  userName: string;
  userCar: string;
  time: string;
  stars: number;
  comment: string;
  handleLikeClick: () => void;
}

export const UserReview = ({
  userName,
  userCar,
  time,
  stars,
  comment,
  handleLikeClick,
}: UserReviewProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <div className="text-sm font-bold">{userName}</div>
        <div className="text-sm mx-2">-</div>
        <div className="text-sm">{time}</div>
      </div>
      <div>{comment}</div>
      <div className="flex flex-row gap-2">
        <img
          onClick={handleLikeClick}
          src="icons/thumbsup.svg"
          alt=""
          className="cursor-pointer"
        />
        <span className="text-green-600 font-bold text-lg ">6</span>
      </div>
    </div>
  );
};
