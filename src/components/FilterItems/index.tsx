import { use, useEffect, useState } from "react";
import { FiltersState, useFiltersStore } from "@store/filters";
export interface FilterItemsProps {
  title: string;
  parameter: string;
  list: EV_Prop[];
  selectedFilters: Map<string, string[]>;
  updateFilter: (parameter: string, value: string) => void;
}

type EV_Prop = { displayName: string; value: string };

export const FilterItems = ({
  title,
  parameter,
  list,
  selectedFilters,
  updateFilter,
}: FilterItemsProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChange = (id: string, checked: boolean | undefined) => {
    console.log("id", parameter, id, checked, list);
    updateFilter(parameter, id);

    const selectedItemsLength = selectedFilters.get(parameter)?.length || 0;

    if (list.map((l) => l.value).includes("all")) {
      //process all clicking
      if (id !== "all" && selectedItemsLength + 1 === list.length) {
        updateFilter(parameter, "all");
        return;
      }

      if (id === "all") {
        list
          .filter((item) => item.value !== "all")
          .forEach((item) => {
            const selected = selectedFilters.get(parameter);
            const isChecked = selected?.includes(item.value);
            if (!checked) {
              !isChecked && updateFilter(parameter, item.value);
            } else {
              isChecked && updateFilter(parameter, item.value);
            }
          });
      }
    }
  };

  // console.log("filters=====================>>>>>", selectedFilters);

  const FilterItem = ({ item }: { item: EV_Prop }) => {
    const selected = selectedFilters.get(parameter);
    const isChecked = selected?.includes(item.value);
    const id = parameter + "_" + item.value;

    return (
      <div className="flex truncate">
        <input
          type="checkbox"
          id={id}
          className="mr-2 cursor-pointer"
          onChange={() => handleChange(item.value, isChecked)}
          checked={isChecked}
        />
        <label
          htmlFor={id}
          className="cursor-pointer whitespace-nowrap select-none"
        >
          {item.displayName}
        </label>
      </div>
    );
  };

  const ShowMore = () => {
    return (
      <div
        className="m-2 cursor-pointer underline font-semibold "
        onClick={() => {
          setItemsPerPage(list.length);
        }}
      >
        Show More
      </div>
    );
  };

  return (
    <div className="m-3">
      <div className="font-bold">{title}</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 m-3">
        {list.slice(0, itemsPerPage).map((item) => (
          <FilterItem item={item} key={item.value} />
        ))}
      </div>
      {list.length > 10 && <ShowMore />}
    </div>
  );
};
