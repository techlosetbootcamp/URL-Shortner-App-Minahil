"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearLoginDetails, loginWithEmail } from "@/redux/slices/loginSlice";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PASSWORD_INPUT_FIELDS as BASE_INPUT_FIELDS } from "@/constants/constants";
const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please fill all fields!");
        setLoading(false);
        return false;
      }
      dispatch(loginWithEmail({ email, password }));
      setLoading(false);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    if (loginState.loginStatus === "succeeded") {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } else if (loginState.loginStatus === "failed") {
      toast.error("Invalid Credentials");
    }
  }, [loginState.loginStatus, loginState.error, router]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginDetails());
    };
  }, [dispatch]);

  const PASSWORD_INPUT_FIELDS = BASE_INPUT_FIELDS.map((field) => ({
    ...field,
    value: field.id === "email" ? email : password,
    onChange:
      field.id === "email"
        ? (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        : (e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value),
  }));

  return { loading, login, PASSWORD_INPUT_FIELDS };
};
export default useLoginForm;
