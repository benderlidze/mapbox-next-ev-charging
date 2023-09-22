type ChargerTypesList =
  | "NEMA520"
  | "NEMA1450"
  | "J1772"
  | "NEMA515"
  | "J1772COMBO"
  | "CMADEMO"
  | "TESLA";

const chargersList = {
  CMADEMO: "/charger-icons/chademo.png",
  TESLA: "/charger-icons/tesla.png",
  J1772: "/charger-icons/j1772.png",
  J1772COMBO: "/charger-icons/J1772Combo.png",
};

// Define a type for the keys of chargersList
export type ChargerType = keyof typeof chargersList;

export const ChargerTypes = ({ types }: { types: ChargerType[] }) => {
  const chargers = types.map((type) => {
    if (chargersList.hasOwnProperty(type as PropertyKey)) {
      return (
        <div className="flex flex-col p-3 w-1/3 items-center" key={type}>
          <div className="text-sm">{type}</div>
          <div className="text-sm">
            <img src={chargersList[type]} alt="" />
          </div>
        </div>
      );
    }
    return null;
  });

  return <>{chargers}</>;
};
