"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { signupUser } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { REGISTER_INPUT_FIELDS as BASE_INPUT_FIELDS } from "@/constants/constants";

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
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signupState.signupStatus === "succeeded") {
      router.push("/login");
    }
  }, [signupState.signupStatus, signupState.error, router]);

  const REGISTER_INPUT_FIELDS = BASE_INPUT_FIELDS.map((field) => ({
    ...field,
    value:
      field.id === "email"
        ? email
        : field.id === "name"
        ? name
        : field.id === "password"
        ? password
        : confirmPassword,
    onChange:
      field.id === "email"
        ? (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        : field.id === "name"
        ? (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
        : field.id === "password"
        ? (e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
        : (e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value),
    disabled: loading,
  }));

  return {
    loading,
    register,
    REGISTER_INPUT_FIELDS,
  };
};

export default useRegisterForm;
