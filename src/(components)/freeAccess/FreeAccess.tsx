"use client"

import { FREE_URL_LIMIT } from "@/constants/constants";
import useFreeAccess from "./useFreeAccess";

const FreeAccess=()=>{
    const {shortenCount}=useFreeAccess();
    return(
        <div className="text-text_secondary">
                You can create <b className="text-brand_primary_pink">{FREE_URL_LIMIT - shortenCount!}</b>{" "}
                more links. Register Now to enjoy Unlimited usage
              </div>
    );
};
export default FreeAccess;