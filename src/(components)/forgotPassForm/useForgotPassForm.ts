"use client"

import { AxiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useForgotPassForm=()=>{
    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const forgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
     
    try {
        const response = await AxiosInstance.post("/password/forgot", {
          email
        });
        if (response.data) {
          
          toast.success("Password Reset Email Sent");
          // router.refresh();
          // router.push("/login");
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