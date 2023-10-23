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

type ChargerTypesProps = {
  types: ChargerType[];
  size?: number;
  selectedType?: ChargerType;
  setSelectedType?: React.Dispatch<
    React.SetStateAction<ChargerType | undefined>
  >;
};

export const ChargerTypes = ({
  types,
  selectedType,
  setSelectedType,
  size = 50,
}: ChargerTypesProps) => {
  console.log("types", types);

  const chargers =
    Array.isArray(types) && types.length > 0 ? (
      types.map((type) => {
        if (chargersList.hasOwnProperty(type as PropertyKey)) {
          return (
            <div
              className={`flex ${
                selectedType && selectedType === type ? "bg-gray-300" : ""
              } flex-col p-3 w-1/3 items-center cursor-pointer rounded-md `}
              key={type}
              onClick={() => {
                // setSelectedTypes((prev) => {
                //   if (prev.includes(type)) {
                //     return prev.filter((item) => item !== type);
                //   }
                //   return [...prev, type];
                // });
                setSelectedType && setSelectedType(type);
              }}
            >
              <div className="text-sm">{type}</div>
              <div className="text-sm ">
                <img src={chargersList[type]} width={size} alt="" />
              </div>
            </div>
          );
        }
        return null;
      })
    ) : (
      <div className="p-2">No data.</div>
    );
  return <>{chargers}</>;
};
