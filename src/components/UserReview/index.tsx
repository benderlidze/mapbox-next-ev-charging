import StarRating from "../StarRating";

interface UserReviewProps {
  userName: string;
  userCar: string;
  time: string;
  stars: number;
  comment: string;
}

export const UserReview = ({
  userName,
  userCar,
  time,
  stars,
  comment,
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
        <img src="icons/thumbsup.svg" alt="" />
        <span className="text-green-600 font-bold text-lg">6</span>
      </div>
    </div>
  );
};
