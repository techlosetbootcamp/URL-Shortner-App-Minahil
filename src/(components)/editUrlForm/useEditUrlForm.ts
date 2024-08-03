"use client";
import { useAppDispatch } from "@/hooks";
import { editUrl } from "@/redux/slices/urlSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useEditUrlForm = (urlCode: string) => {
  const router = useRouter();
  const [editablePart, setEditablePart] = useState(urlCode);
  const newUrlCode = editablePart;
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!editablePart) {
        toast.error("You can't leave it empty!");
        setLoading(false);
        return false;
      }
      dispatch(editUrl({ urlCode, newUrlCode }));
      toast.success("URL Updated Successfully");

      setLoading(false);
    } catch (error) {
      toast.error(`${error}`);
      router.push("/dashboard");
    }
  };

  return { editablePart, setEditablePart, handleEdit, loading };
};
export default useEditUrlForm;
