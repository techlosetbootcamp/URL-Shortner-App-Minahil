"use client";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useRegisterForm = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosInstance.post("/signup", {
        name, email, password
      });
      if (response.data) {
        
        toast.success("Successfully registered");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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
