"use client"
import { FREE_URL_LIMIT } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUrlAnalytic } from "@/redux/slices/urlAnalyticSlice";
import { getUrls, shortenUrl } from "@/redux/slices/urlSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isWebUri } from "valid-url";

const useUrlShortenForm = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const link = useAppSelector((state) => state.url);
  const code = link?.url?.urlCode;

  // Initialize the shortened URLs count from local storage
  const getShortenedUrlsCount = () => {
    return parseInt(localStorage.getItem("shortenedUrlsCount") || "0", FREE_URL_LIMIT);
  };

  const [shortenedUrlsCount, setShortenedUrlsCount] = useState(getShortenedUrlsCount);

  useEffect(() => {
    if (code) {
      dispatch(getUrls());
    }
  }, [code, dispatch]);

  const shorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!url) {
        toast.error("Please first enter the link!");
        setLoading(false);
        return false;
      }
      if (!isWebUri(url)) {
        toast.error("Invalid Url");
        setLoading(false);
        return false;
      }

      if (shortenedUrlsCount >= FREE_URL_LIMIT) {
        toast.error("You have reached the free URL limit. Please log in to continue shortening URLs.");
        setLoading(false);
        return false;
      }

      dispatch(shortenUrl({ url })).then(() => {
        // Increment the count and update local storage after successfully shortening the URL
        const newCount = shortenedUrlsCount + 1;
        setShortenedUrlsCount(newCount);
        localStorage.setItem("shortenedUrlsCount", newCount.toString());
        setUrl("");
        setLoading(false);
      });
      
    } catch (error) {
      toast.error(`${error}`);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setShortenedUrlsCount(shortenedUrlsCount)
  // }, [shorten]);

  return { url, setUrl, loading, shorten,shortenedUrlsCount };
};

export default useUrlShortenForm;
