import { useState } from "react";
import { Pin } from "@components/PinPopup";

export const Tabs = ({ pin }: { pin: Pin }) => {
  const [selected, setSelected] = useState<string>("Info");
  const tabsList = ["Info", "Chargers", "Check-in", "Reviews"];

  const TabItem = (name: string) => {
    return (
      <div
        onClick={() => setSelected(name)}
        key={name}
        className={`pb-2 select-none flex w-full border-b-2 ${
          selected === name
            ? `border-red-500 text-[#EB5757]`
            : `border-gray-500`
        } justify-center cursor-pointer`}
      >
        {name}
      </div>
    );
  };
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center mt-4">
        {tabsList.map((tab, key) => TabItem(tab))}
      </div>

      <div className="mt-4 grid grid-cols-1 divide-y divide-solid border border-gray-300 rounded-lg bg-slate-100">
        <div className="flex flex-row justify-between p-3">
          <div className="text-sm">Parking</div>
          <div className="text-sm">Pay</div>
        </div>

        <div className="flex flex-row justify-between p-3">
          <div className="text-sm">Cost</div>
          <div className="text-sm">{pin.ev_pricing}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 divide-y divide-solid border border-gray-00 rounded-lg bg-slate-100">
        <div className="flex flex-row justify-between p-3">
          <div className="text-sm">Access</div>
          <div className="text-sm"></div>
        </div>

        <div className="flex flex-row justify-between p-3">
          <div className="text-sm">{pin.access_days_time}</div>
          <div className="text-sm"></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 divide-y divide-solid border border-gray-00 rounded-lg bg-slate-100">
        <div className="flex flex-row justify-between p-3">
          <div className="text-sm">Chargers</div>
          <div className="text-sm">
            <img src="/charger-icons/chademo.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
