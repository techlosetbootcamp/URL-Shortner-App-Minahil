"use client";
import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { changePassword } from "@/redux/slices/passwordSlice";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

const useChange = () => {
  const [loading, setLoading] = useState(false);
  const [password, setNewPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useFetchUser();
  const email = user?.email;
  const dispatch = useAppDispatch();
  const change = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const match = await bcrypt.compare(oldpassword, user?.password!);
      if (!match) {
        toast.error("Incorrect Old Password");
        setLoading(false);
        return false;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return false;
      }
      dispatch(changePassword({ password, email }));
      toast.success("Password Changed Successfully!");
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`,
      });
    } catch (err: any) {
      toast.error("Error try again!");
    } finally {
      setLoading(false);
    }
  };

  const INPUT_FIELDS = [
    {
      type: "password",
      placeholder: "Old Password",
      value: oldpassword,
      onChange: setOldPassword,
    },
    {
      type: "password",
      placeholder: "New Password",
      value: password,
      onChange: setNewPassword,
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: setConfirmPassword,
    },
  ];
  return {
    loading,
    change,
    INPUT_FIELDS,
  };
};
export default useChange;
