"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { VehicleSelectForm } from "@components/VehicleSelectForm";
import { UserVehicles } from "@components/UserVehicles";

type SettingsWindowProps = {
  setIsOpenSettingWindow: Dispatch<SetStateAction<boolean>>;
};

export const SettingsWindow = ({
  setIsOpenSettingWindow,
}: SettingsWindowProps) => {
  const [updateUserVehicles, setUpdateUserVehicles] = useState(0);

  const handleCloseButton = () => {
    setIsOpenSettingWindow(false);
  };

  const handleOnAddVehicle = () => {
    //on "VEHICLE UPDATED" rerender the UserVehicles component
    setUpdateUserVehicles((state) => state + 1);
  };

  return (
    <div className="flex flex-col gap-3 w-10/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  bg-white border rounded-xl shadow-md p-4">
      <div
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={handleCloseButton}
      >
        <img src="/icons/close.svg" alt="" width={40} />
      </div>
      <div className="font-bold">My vehicles:</div>
      <UserVehicles key={updateUserVehicles} />
      <div className="font-bold">Select a vehicle:</div>
      <VehicleSelectForm onAddVehicle={handleOnAddVehicle} />
      <div
        onClick={handleCloseButton}
        className={`flex w-fit select-none text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit`}
      >
        Close
      </div>
    </div>
  );
};
