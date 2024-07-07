"use client";
import { AxiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useRegisterForm = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  boolean,
  () => Promise<void>
] => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();

    
  const register = async () => {
    console.log("loading true....");
    setLoading(true);
    try{
        console.log("call api");
        const response=await AxiosInstance.post("/signup",{
            name, email, password
        });
        console.log("called api,",response.data);
        // await signIn("credentials",{
        //     email, password,
        //     redirect:false,
        // })
        toast.success("Successfully registered");
        router.push("/login");
    } catch(err:any){
        toast.error(err?.response?.data)
    } finally{
        setLoading(false);
    }
  };
  return [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    register,
  ];
};
export default useRegisterForm;
