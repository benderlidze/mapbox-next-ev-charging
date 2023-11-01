import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserReviewProps {
  userName: string;
  userCar: string;
  time: string;
  stars: number;
  comment: string;
  likes: number;
  ableToLike: boolean;
  handleLikeClick: () => void;
}

export const UserReview = ({
  userName,
  time,
  comment,
  likes,
  ableToLike,
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
      <div className="flex flex-row gap-2 select-none ">
        <img
          onClick={handleLikeClick}
          src="icons/thumbsup.svg"
          alt=""
          className={ableToLike ? "cursor-pointer" : "pointer-events-none"}
          style={{ filter: ableToLike ? "grayscale(0)" : "grayscale(100%)" }}
        />
        <span className="text-green-600 font-bold text-lg ">{likes}</span>
      </div>
    </div>
  );
};
