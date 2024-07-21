"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { autoGenerateUrlSlug } from "@/redux/slices/autoSlugSlice";
import { shortenUrl, shortenUrlWithCustomSlug } from "@/redux/slices/urlSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { isWebUri } from "valid-url";

const useAddUrlForm = () => {
  const autoSlug = useAppSelector((state) => state.autoSlug.slug);
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (autoSlug) {
      setSlug(autoSlug);
      setLoading(false);
    }
  }, [autoSlug]);

  const handleAutoGenerate = () => {
    setLoading(true);
    dispatch(autoGenerateUrlSlug());
  };

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
      if (!slug) {
        dispatch(shortenUrl({ url }));
      } else {
        dispatch(shortenUrlWithCustomSlug({ url, customSlug: slug }));
      }

      setLoading(false);
      setUrl("");
      setSlug("");
    } catch (error) {
      toast.error(`${error}`);
      setLoading(false);
    }
  };

  return { url, setUrl, slug, setSlug, loading, handleAutoGenerate, shorten };
};
export default useAddUrlForm;
