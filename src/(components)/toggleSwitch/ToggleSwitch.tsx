"use client"
import { useState } from "react";

const ToggleSwitch = () => {
  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => setEnabled(!enabled);

  return (
    <div className="flex items-center">
      <div
        onClick={toggleSwitch}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-400"
        } relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
        />
      </div>
     
    </div>
  );
};

export default ToggleSwitch;
