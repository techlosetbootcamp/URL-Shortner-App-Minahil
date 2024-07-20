"use client"
import { useState } from "react";

const useAddUrlForm=()=>{
    const [url, setUrl]=useState<string>("");
    const [loading, setLoading]=useState<boolean>(false);


    return {url, setUrl,loading};
};
export default useAddUrlForm;