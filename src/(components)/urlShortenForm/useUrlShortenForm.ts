"use client"
import { useAppDispatch } from "@/hooks";
import { getUrlDetails } from "@/redux/slices/urlSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { isWebUri } from "valid-url";

const useUrlShortenForm=()=>{
    const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useAppDispatch();


  const shorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
      try {
        if(!url){
          toast.error("Please first enter the link!");
          setLoading(false);
        return false;
        }
        if (!isWebUri(url!)) {
          toast.error("Invalid Url");
          setLoading(false);
          return false;
        }
        console.log("inside shortenn");
        console.log(url);
        dispatch(getUrlDetails({url}));
        setLoading(false);
        setUrl("");
      } catch (error) {
        toast.error(`${error}`);
      }
      
    }
    
    return {url, setUrl,loading,shorten};
};
export default useUrlShortenForm;