"use client";

import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { editUser } from "@/redux/slices/userSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useEditProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError } = useFetchUser();
  const email = user?.email;
  const prevName = user?.name;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [newEmail, setEmail] = useState(user?.email || "");

  const router = useRouter();
  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    if (name === prevName && newEmail === email) {
      e.preventDefault();
      console.log("helllo");
      toast.success("Nothing to save/update");
      return;
    } else {
      setLoading(true);
      e.preventDefault();
      dispatch(editUser({ name, email, newEmail }));
      if (newEmail != email) {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        });
        toast.success("Sign in again");
        setLoading(false);
      } else {
        setLoading(false);
        router.push("/dashboard");
      }
    }
  };
  return {
    user,
    isLoading,
    isError,
    name,
    setName,
    newEmail,
    setEmail,
    handleSaveChanges,
  };
};
export default useEditProfileForm;
