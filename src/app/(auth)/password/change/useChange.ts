"use client"
import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { changePassword } from "@/redux/slices/passwordSlice";
import { AxiosInstance } from "@/utils/axiosInstance";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useChange=()=>{

    const [loading, setLoading] = useState(false);
    const [password, setNewPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { user, isLoading, isError }=useFetchUser();
    const email=user?.email;
    const dispatch=useAppDispatch();
    const change = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            dispatch(changePassword({password,email}));    
            toast.success("Password Changed Successfully!"); 
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/login`,
            });       
          } catch (err: any) {
            toast.error("Error try again!");
          } finally {
            setLoading(false);
          }
        
      };

    return {loading, error,password,setNewPassword,oldpassword,setOldPassword,change};
};
export default useChange;