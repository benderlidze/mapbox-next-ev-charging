import { useState } from "react";
import { Pin } from "@components/PinPopup";
import { ChargerType, ChargerTypes } from "@components/ChargerTypes";

type TabName = "Info" | "Chargers" | "Check-in" | "Reviews";
const tabsList: TabName[] = ["Info", "Chargers", "Check-in", "Reviews"];

interface TabContentProps {
  tabName: TabName;
  children: React.ReactNode;
}

export const Tabs = ({ pin }: { pin: Pin }) => {
  const [selected, setSelected] = useState<string>("Info");

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

  const TabContentWrapper = ({ children, tabName }: TabContentProps) => {
    if (selected === tabName) {
      return children;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 justify-items-center mt-4">
        {tabsList.map((tab, key) => TabItem(tab))}
      </div>

      <TabContentWrapper tabName="Chargers">
        <div className="flex flex-row mt-4 border border-gray-00 rounded-lg bg-slate-100">
          <ChargerTypes types={pin.ev_connector_types as ChargerType[]} />
        </div>
      </TabContentWrapper>

      <TabContentWrapper tabName="Info">
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
      </TabContentWrapper>
    </>
  );
};
