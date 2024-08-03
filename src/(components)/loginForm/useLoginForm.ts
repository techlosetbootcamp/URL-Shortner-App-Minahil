"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearLoginDetails, loginWithEmail } from "@/redux/slices/loginSlice";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const PASSWORD_INPUT_FIELDS = [
    {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: setEmail,
    },
    {
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: setPassword,
    },
  ];

  return { loading, login, PASSWORD_INPUT_FIELDS };
};
export default useLoginForm;
