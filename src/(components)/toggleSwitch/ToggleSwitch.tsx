"use client";

import { ON_CHANGE_PROPS } from "@/types/types";
import useToggleSwitch from "./useToggleSwitch";

const ToggleSwitch = ({ onChange }: ON_CHANGE_PROPS) => {
  const { enabled, toggleSwitch } = useToggleSwitch(onChange);
  return (
    <div className="flex items-center">
      <div
        onClick={toggleSwitch}
        className={`${
          enabled ? "bg-brand_primary_blue" : "bg-input_bg_clr"
        } relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 `}
      >
        <span
          className={`${
            enabled
              ? "translate-x-1 bg-input_bg_clr"
              : "translate-x-6 bg-brand_primary_blue"
          } inline-block w-4 h-4 transform rounded-full transition-transform duration-300`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
