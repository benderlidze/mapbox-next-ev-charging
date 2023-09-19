export interface FilterItemsProps {
  title: string;
  list: string[];
}

export const FilterItems = ({ title, list }: FilterItemsProps) => {
  return (
    <div>
      {title}
      <div className="grid grid-cols-5 gap-4">
        {list.map((item) => (
          <div className="flex">
            <input type="checkbox" className="" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
