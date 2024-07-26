"use client"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUrlAnalytic } from "@/redux/slices/urlAnalyticSlice";
import { deleteUrl, getUrls, toggleUrlStatus } from "@/redux/slices/urlSlice";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const formatDate = (dateString: string) => {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  };
  return new Intl.DateTimeFormat('en-US', options).format(date).replace(/ /g, ' - ');
};

const useLinkData = () => {
  const router=useRouter();
  const [loading,setLoading]=useState(false);
  const url = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();
 console.log("useLink");
 console.log(url.urls);
  useEffect(() => {
    dispatch(getUrls());
  }, [dispatch]);


  const handleEdit = (urlCode:string) => {
    router.push(`/url/${urlCode}`);
  };

  const handleDelete = (urlCode:string) => {
    try {
      setLoading(true);
      dispatch(deleteUrl({ urlCode }));
      dispatch(getUrls());
      setLoading(false);
      toast.success("URL deleted successfully");
      
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };

  const handleCopy = (shortUrl:string) => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success("Link Copied");
    }
  };

  const handleToggleStatus = (urlCode:string, active:boolean) => {
    if (urlCode) {
      dispatch(toggleUrlStatus({ urlCode }))
        .unwrap()
        .then(() => {
          toast.success(`URL ${active ? 'deactivated' : 'activated'} successfully`);
        })
        .catch(() => {
          toast.error('Failed to toggle URL status');
        });
    }
  };

  return { url, handleCopy, handleToggleStatus,formatDate,handleEdit,handleDelete,loading };
};

export default useLinkData;
