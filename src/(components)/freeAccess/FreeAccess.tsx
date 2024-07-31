"use client"

import { FREE_URL_LIMIT } from "@/constants/constants";
import useFreeAccess from "./useFreeAccess";
import { FaRegCircleQuestion } from "react-icons/fa6";

const FreeAccess=()=>{
    const {shortenCount}=useFreeAccess();
    return(
        <div className="text-text_secondary flex items-center gap-[10px]">
                You can create <b className="text-brand_primary_pink">{FREE_URL_LIMIT - shortenCount!}</b>{" "}
                more links. Register Now to enjoy Unlimited usage <FaRegCircleQuestion />
              </div>
    );
};
export default FreeAccess;