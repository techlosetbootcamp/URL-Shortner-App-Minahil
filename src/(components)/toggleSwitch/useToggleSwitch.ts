"use client";
import { Dispatch, SetStateAction, useState } from "react";

const useToggleSwitch = (onChange: Dispatch<SetStateAction<boolean>>) => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => {
    setEnabled(!enabled);
    onChange(!enabled);
  };
  return { enabled, toggleSwitch };
};
export default useToggleSwitch;
