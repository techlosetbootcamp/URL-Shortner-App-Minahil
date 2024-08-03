"use client";
import { FREE_URL_LIMIT } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUrls, shortenUrl } from "@/redux/slices/urlSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isWebUri } from "valid-url";
import useLinkData from "../linkData/useLinkData";

const useUrlShortenForm = () => {
  const session = useSession();
  const [autoPaste, setAutoPaste] = useState(false);
  const [urll, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const link = useAppSelector((state) => state.url);
  const code = link?.url?.urlCode;
  const { url } = useLinkData();
  const count = url?.urls?.length;

  useEffect(() => {
    if (autoPaste) {
      const readFromClipboard = async () => {
        try {
          const text = await navigator.clipboard.readText();
          setUrl(text);
        } catch (err) {}
      };

      readFromClipboard();
    }
  }, [autoPaste]);

  useEffect(() => {
    if (code) {
      dispatch(getUrls());
    }
  }, [code, dispatch]);

  const shorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!urll) {
        toast.error("Please first enter the link!");
        setLoading(false);
        return false;
      }
      if (!isWebUri(urll)) {
        toast.error("Invalid Url");
        setLoading(false);
        return false;
      }

      if (!session.data?.user && count! >= FREE_URL_LIMIT) {
        toast.error(
          "You have reached the free URL limit. Please log in to continue shortening URLs."
        );
        setLoading(false);
        return false;
      }

      dispatch(shortenUrl({ url: urll })).then(() => {
        setUrl("");
        setLoading(false);
      });
    } catch (error) {
      toast.error(`${error}`);
      setLoading(false);
    }
  };

  return { url: urll, setUrl, loading, shorten, count, setAutoPaste };
};

export default useUrlShortenForm;
