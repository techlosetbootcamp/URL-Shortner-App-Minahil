"use client";
import { FILTER_OPTIONS } from "@/constants/constants";
import { FILTER_PROPS } from "@/types/types";
import useFilter from "./useFilter";

const Filter = ({ onFilterChange }: FILTER_PROPS) => {
  const { status, setStatus } = useFilter(onFilterChange);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    onFilterChange(selectedStatus);
  };

  return (
    <div className="flex gap-[20px] ">
      <div className="">
        <select
          value={status}
          onChange={handleStatusChange}
          className="appearance-none bg-transparent"
        >
          {FILTER_OPTIONS.map((option, index) => (
            <option
              key={index}
              className="bg-brand_grey bordertext-input_txt_clr font-bold text-[15px] flex items-center justify-center"
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
