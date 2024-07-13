"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { signupUser } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRegisterForm = ()=> {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signup);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(signupUser({email,name,password}));
      
       
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

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    register,
  };
};

export default useRegisterForm;
