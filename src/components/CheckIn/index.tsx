import { ChargerType, ChargerTypes } from "@components/ChargerTypes";
import { PinProps } from "@components/PinPopup";
import StarRating from "@components/StarRating";
import { ToggleSwitcher } from "@components/ToggleSwitcher";

interface CheckInProps {
  pin: PinProps;
}
export const CheckIn = ({ pin }: CheckInProps) => {
  return (
    <div
      className="flex flex-col gap-2 overflow-auto max-h-[300px] 
    sm:overflow-visible sm:max-h-screen"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">Overall rating</div>
        <div className="text-sm">
          <StarRating rating={3} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm">Charging speed</div>
        <div className="text-sm">
          <StarRating rating={4} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm">Reliability</div>
        <div className="text-sm">
          <StarRating rating={3} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm">Safety & Cleanliness</div>
        <div className="text-sm">
          <StarRating rating={3} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">Power consumed</div>
        <div className="text-sm">
          <input
            type="text"
            className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
            placeholder="KWs"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">Charging time</div>
        <div className="text-sm">
          <input
            type="text"
            className="w-16  p-2 bg-gray-300 rounded-2xl border-none"
            placeholder="mins"
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="text-xl">Plug type</div>
        <div className="flex flex-row">
          <ChargerTypes types={pin.ev_connector_types as ChargerType[]} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl">Wait to charge? </div>
        <div className="text-sm">
          <ToggleSwitcher />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="text-xl">Comments </div>
        <div className="">
          <textarea
            name=""
            className="p-2 w-full min-h-[100px] bg-gray-300 rounded-2xl "
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center gap-1">
        <div className="">
          <input type="checkbox" />
        </div>
        <div className="text-xs">I wish to remain anonymous</div>
      </div>
      <div className="flex justify-center gap-1">
        <div
          onClick={() => {}}
          className="select-none w-1/2 flex justify-center text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit mt-2 mb-2"
        >
          Submit
        </div>
      </div>
    </div>
  );
};
