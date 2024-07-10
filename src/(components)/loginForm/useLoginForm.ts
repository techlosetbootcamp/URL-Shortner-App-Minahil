"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const signInData = await signIn("credentials", {
      email: email,
      password: password,
    });

    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      try {
        toast.success("Logged in successfully!");
        window.location.href = "/dashboard";
        router.push("/dashboard");
      } catch (error) {
        toast.error(`${error}`);
        console.error("Failed to navigate using RSC:", error);
        window.location.href = "/dashboard";
      }
    }

    setLoading(false);
  };

  return { email, setEmail, password, setPassword, loading, login };
};
export default useLoginForm;
