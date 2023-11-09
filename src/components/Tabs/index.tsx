import { useState } from "react";
import { DBPinPopup } from "@components/PinPopup";
import { ChargerTypes } from "@components/ChargerTypes";

import { CheckinsList } from "@components/CheckinsList";
import { Vehicle } from "@apptypes/vehicle";
import { Reviews } from "../Reviews";

type TabName = "Info" | "Chargers" | "Check-in" | "Reviews";
const tabsList: TabName[] = ["Info", "Chargers", "Check-in", "Reviews"];

interface TabContentProps {
  tabName: TabName;
  children: React.ReactNode;
}

export const Tabs = ({
  pinData,
  vehicles,
}: {
  pinData: DBPinPopup;
  vehicles: Vehicle[];
}) => {
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
          <ChargerTypes types={pinData["EV Connector Types"]} />
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
            <div className="text-sm">{pinData["EV Pricing"]}</div>
          </div>

          <div className="flex flex-row justify-between p-3">
            <div className="text-sm">Facility Type</div>
            <div className="text-sm">{pinData["Facility Type"]}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 divide-y divide-solid border border-gray-00 rounded-lg bg-slate-100">
          <div className="flex flex-row justify-between p-3">
            <div className="text-sm">Access</div>
            <div className="text-sm"></div>
          </div>

          <div className="flex flex-row justify-between p-3">
            <div className="text-sm">{pinData["Access Days Time"]}</div>
            <div className="text-sm"></div>
          </div>
        </div>
      </TabContentWrapper>

      <TabContentWrapper tabName="Check-in">
        <CheckinsList pinData={pinData} vehicles={vehicles} />
      </TabContentWrapper>

      <TabContentWrapper tabName="Reviews">
        <Reviews pinData={pinData} vehicles={vehicles} />
      </TabContentWrapper>
    </>
  );
};
