"use client"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUrlAnalytic } from "@/redux/slices/urlAnalyticSlice";
import { deleteUrl, getUrls, toggleUrlStatus } from "@/redux/slices/urlSlice";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const url = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();

  const [filterCriteria, setFilterCriteria] = useState<string>("");

  const [linkImages, setLinkImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: { [key: string]: string } = {};

      for (const link of url?.urls!) {
        if (link.urlCode) {
          try {
            const response = await AxiosInstance.get(`/ogImage`, {
              params: { url: link.originalUrl }
            });
            images[link.urlCode] = response.data.image;
          } catch (error) {
            
          }
        }
      }

      setLinkImages(images);
    };

    fetchImages();
  }, [url?.urls]);

  useEffect(() => {
    dispatch(getUrls());
  }, [dispatch]);

  const handleFilterChange = (criteria: string) => {
    setFilterCriteria(criteria);
  };

  const filteredLinks = url?.urls?.filter((link) => {
    if (filterCriteria === "active" && !link.active) {
      return false;
    }
    if (filterCriteria === "inactive" && link.active) {
      return false;
    }
    return true;
  });

  const handleEdit = (urlCode: string) => {
    router.push(`/url/${urlCode}`);
  };

  const handleDelete = async (urlCode: string) => {
    try {
      setLoading(true);
      await dispatch(deleteUrl({ urlCode })).unwrap();
      await dispatch(getUrls());
      toast.success("URL deleted successfully");
    } catch (error) {
      toast.error("Failed to delete URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (shortUrl: string) => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success("Link Copied");
    }
  };

  const handleToggleStatus = async (urlCode: string, active: boolean) => {
    if (urlCode) {
      try {
        await dispatch(toggleUrlStatus({ urlCode })).unwrap();
        toast.success(`URL ${active ? 'deactivated' : 'activated'} successfully`);
      } catch (error) {
        toast.error('Failed to toggle URL status');
      }
    }
  };

  return { url, handleCopy, handleToggleStatus, formatDate, handleEdit, handleDelete, loading, handleFilterChange, filteredLinks,linkImages };
};

export default useLinkData;
