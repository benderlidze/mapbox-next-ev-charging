import { use, useEffect, useState } from "react";
import { useFiltersStore } from "@store/filters";
export interface FilterItemsProps {
  title: string;
  parameter: string;
  list: string[];
}

export const FilterItems = ({ title, parameter, list }: FilterItemsProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const filters = useFiltersStore((state) => state.filters);
  const updateFilter = useFiltersStore((state) => state.updateFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelected((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((item) => item !== id);
      }
    });
  };

  useEffect(() => {
    console.log("selected", selected);
    selected.length > 0 && updateFilter(parameter, selected);
  }, [selected]);

  return (
    <div className="m-3">
      <div className="font-bold">{title}</div>
      <div className="grid grid-cols-5 gap-4 m-3">
        {list.map((item) => (
          <div className="flex" key={item}>
            <input
              type="checkbox"
              id={item}
              className="mr-2 cursor-pointer"
              onChange={handleChange}
            />
            <label
              htmlFor={item}
              className="cursor-pointer whitespace-nowrap select-none"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
