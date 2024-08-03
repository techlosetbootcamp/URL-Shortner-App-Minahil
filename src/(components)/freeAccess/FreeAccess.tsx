"use client";

import { FREE_URL_LIMIT } from "@/constants/constants";
import useFreeAccess from "./useFreeAccess";
import { FaRegCircleQuestion } from "react-icons/fa6";

const FreeAccess = () => {
  const { shortenCount } = useFreeAccess();
  return (
    <div className="text-text_secondary text-center flex items-center gap-[10px]">
      <div>
        You can create{" "}
        <span className="text-brand_primary_pink font-bold">
          {FREE_URL_LIMIT - shortenCount!}
        </span>{" "}
        more links. Register Now to enjoy Unlimited usage
      </div>{" "}
      <FaRegCircleQuestion className="hidden md:flex cursor-pointer" />
    </div>
  );
};
export default FreeAccess;
