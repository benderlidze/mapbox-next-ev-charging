import { StarRating } from "@components/StarRating";

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
      <div className="flex flex-col  ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-bold">{userName}</div>
          <div className="text-sm">
            <StarRating value={stars} />
          </div>
        </div>
        <div className="text-sm">{userCar}</div>
        <div className="text-sm">{time}</div>
      </div>
    </div>
  );
};
