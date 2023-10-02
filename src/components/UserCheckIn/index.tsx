import StarRating from "../StarRating";

interface UserCheckInProps {
  userName: string;
  userCar: string;
  time: string;
  stars: number;
  comment: string;
}

export const UserCheckIn = ({
  userName,
  userCar,
  time,
  stars,
  comment,
}: UserCheckInProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-bold">{userName}</div>
        <div className="text-sm mx-2">-</div>
        <div className="text-sm">{userCar}</div>
        <div className="text-sm">{time}</div>
        <div className="text-sm">
          <StarRating rating={3} />
        </div>
      </div>
    </div>
  );
};
