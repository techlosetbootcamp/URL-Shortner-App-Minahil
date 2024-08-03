"use client";
import { useState } from "react";

const useFilter = (onFilterChange: any) => {
  const [status, setStatus] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange({ status });
  };
  return { status, setStatus, handleFilterChange };
};
export default useFilter;
