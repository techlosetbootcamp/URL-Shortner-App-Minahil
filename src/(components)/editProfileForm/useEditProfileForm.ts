"use client";

import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { editUser } from "@/redux/slices/userSlice";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const useEditProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError } = useFetchUser();
  const email = user?.email;
  const prevName = user?.name;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [newEmail, setEmail] = useState(user?.email || "");

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === prevName && newEmail === email) {
      toast.success("Nothing to save/update");
      return;
    }

    setLoading(true);

    try {
      const action = await dispatch(editUser({ name, email, newEmail }));

      if (editUser.fulfilled.match(action)) {
        if (newEmail !== email) {
          toast.success("Email updated. Please sign in again.");
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
          });
        } else {
          toast.success("Profile updated successfully.");
        }
      } else if (editUser.rejected.match(action)) {
        toast.error("Email already exists");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const EDIT_INPUT_FIELDS = [
    {
      label: "Name:",
      type: "text",
      value: name,
      onChange: (e: any) => setName(e.target.value),
    },
    {
      label: "Email:",
      type: "email",
      value: newEmail,
      onChange: (e: any) => setEmail(e.target.value),
    },
  ];
  return {
    isLoading,
    handleSaveChanges,
    loading,
    EDIT_INPUT_FIELDS,
  };
};
export default useEditProfileForm;
