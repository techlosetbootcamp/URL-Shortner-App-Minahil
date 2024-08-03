"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { signupUser } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signup);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return false;
    }
    try {
      dispatch(signupUser({ email, name, password }));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signupState.signupStatus === "succeeded") {
      router.push("/login");
    }
  }, [signupState.signupStatus, signupState.error, router]);

  const REGISTER_INPUT_FIELDS = [
    {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: any) => setEmail(e.target.value),
      disabled: loading,
    },
    {
      type: "text",
      placeholder: "Name",
      value: name,
      onChange: (e: any) => setName(e.target.value),
      disabled: loading,
    },
    {
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: any) => setPassword(e.target.value),
      disabled: loading,
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e: any) => setConfirmPassword(e.target.value),
      disabled: loading,
    },
  ];

  return {
    loading,
    register,
    REGISTER_INPUT_FIELDS,
  };
};

export default useRegisterForm;
