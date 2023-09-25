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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    console.log("id", id);
    updateFilter(parameter, id);
  };

  console.log("filters=====================>>>>>", selectedFilters);

  const FilterItem = ({ item }: { item: EV_Prop }) => {
    const selected = selectedFilters.get(parameter);
    const isChecked = selected?.includes(item.value);

    return (
      <div className="flex truncate">
        <input
          type="checkbox"
          id={item.value}
          className="mr-2 cursor-pointer"
          onChange={handleChange}
          checked={isChecked}
        />
        <label
          htmlFor={item.value}
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
        className="cursor-pointer underline font-semibold "
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
        {list.splice(0, itemsPerPage).map((item) => (
          <FilterItem item={item} key={item.value} />
        ))}
        {list.length > 10 && <ShowMore />}
      </div>
    </div>
  );
};
