"use client"
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

interface FilterProps {
  onFilterChange: (criteria: string) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [status, setStatus] = useState<string>("");

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
          <option className=" bg-brand_grey bordertext-input_txt_clr font-bold text-[15px] flex items-center justify-center" value="">Filter</option>
          <option className=" bg-brand_grey bordertext-input_txt_clr font-bold text-[15px] flex items-center justify-center" value="active">Active</option>
          <option className=" bg-brand_grey bordertext-input_txt_clr font-bold text-[15px] flex items-center justify-center" value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
