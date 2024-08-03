"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const forgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("api/password/forgot", {
        email,
      });
      if (response.data) {
        toast.success("Password Reset Email Sent");
      }
      if (response.status === 409) {
        toast.error("Email doesn't exist");
      }
    } catch (err: any) {
      toast.error("Error sending Password Reset Email");
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, forgot };
};
export default useForgotPassForm;
