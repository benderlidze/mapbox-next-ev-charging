import { useState } from "react";
import { PinProps } from "@components/PinPopup";
import { ChargerType, ChargerTypes } from "@components/ChargerTypes";
import { UserCheckIn } from "@components/UserCheckIn";
import { SvgButton } from "@components/SvgButton";
import { UserReview } from "@components/UserReview";

type TabName = "Info" | "Chargers" | "Check-in" | "Reviews";
const tabsList: TabName[] = ["Info", "Chargers", "Check-in", "Reviews"];

interface TabContentProps {
  tabName: TabName;
  children: React.ReactNode;
}

export const Tabs = ({ pin }: { pin: PinProps }) => {
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

      <TabContentWrapper tabName="Check-in">
        <div>
          <div className="flex flex-col gap-4 p-2 mt-4 border border-gray-00 rounded-lg bg-slate-100">
            <div className="flex flex-row-reverse">
              <SvgButton icon="/icons/filter.svg" onClick={() => {}} />
            </div>
            <UserCheckIn
              userName="Alice"
              userCar="Tesla Model 3"
              time="2 hours ago"
              stars={4}
              comment="This is a comment"
            />
            <UserCheckIn
              userName="Bob"
              userCar="VW id 4"
              time="2 hours ago"
              stars={4}
              comment="This is a comment"
            />
            <UserCheckIn
              userName="Susan"
              userCar="Mercedes EQS"
              time="2 hours ago"
              stars={4}
              comment="This is a comment"
            />
          </div>
        </div>
      </TabContentWrapper>

      <TabContentWrapper tabName="Reviews">
        <div>
          <div className="flex flex-col gap-4 p-2 mt-4 border border-gray-00 rounded-lg bg-slate-100">
            <div className="flex flex-row-reverse">
              <SvgButton icon="/icons/filter.svg" onClick={() => {}} />
            </div>
            <UserReview
              userName="Alice"
              userCar="Tesla Model 3"
              time="2 hours ago"
              stars={4}
              comment="Often occupied by car sharing company, and cable is not even charging. Seems like they just occupying space and shuffling between cars."
            />
            <UserReview
              userName="John"
              userCar="Tesla Model x"
              time="2 hours ago"
              stars={4}
              comment="Often occupied by car sharing company, and cable is not even charging. Seems like they just occupying space and shuffling between cars."
            />
          </div>
        </div>
      </TabContentWrapper>
    </>
  );
};
