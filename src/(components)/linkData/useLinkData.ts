"use client"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleUrlStatus } from "@/redux/slices/urlSlice";
import toast from "react-hot-toast";

// Function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  };
  return new Intl.DateTimeFormat('en-US', options).format(date).replace(/ /g, ' - ');
};

const useLinkData = () => {
  const link = useAppSelector((state) => state.url);
  const linkAnalytic = useAppSelector((state) => state.urlAnalytic);
  const date = linkAnalytic?.urlAnalytic?.updatedAt ? formatDate(linkAnalytic.urlAnalytic.updatedAt) : null;
  const clicks = linkAnalytic?.urlAnalytic?.clicked;
  const dispatch=useAppDispatch();
  const handleCopy = () => {
    if (link?.url?.shortUrl) {
      navigator.clipboard.writeText(link.url.shortUrl);
      toast.success("Link Copied");
    }
  };

  const handleToggleStatus = () => {
    
    if (link?.url?.urlCode) {
      dispatch(toggleUrlStatus({ urlCode: link.url.urlCode }))
        .unwrap()
        .then(() => {
          console.log("link.url.active");
          console.log(link.url.active);
          toast.success(`URL ${link.url.active ? 'deactivated' : 'activated'} successfully`);
        })
        .catch(() => {
          toast.error('Failed to toggle URL status');
        });
    }
  };

  return { link, handleCopy, clicks, date,handleToggleStatus };
};

export default useLinkData;
