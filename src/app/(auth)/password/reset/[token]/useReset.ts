"use client"
import { userType } from "@/constants/types/userType";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useReset=(token:string)=>{

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userType>();
  
    const router = useRouter();

    useEffect(()=>{


    const verifyToken = async()=>{
        try {
            
            
            const response = await AxiosInstance.post("/password/verifytoken", {
              token:token,
             
            });
            if (response.status===409) {
                setError("Invalid Token or has expired");
                setVerified(true);
              toast.error("Invalid Token or has expired");
            }

            if (response.status===200) {
                setError("");
                setVerified(true);
                const userData=response.data;
               
                setUser(userData);
            }
          } catch (error) {
            toast.error("Error, try Again");
         
          }        
    };
    verifyToken();
},[token])

    const reset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await AxiosInstance.post("/password/reset", {
              password,email:user?.email
            });

            if (response.status===400) {
              setError("Something Went wrong, try again");
              toast.error("Something Went wrong, try again");
            }

            if (response.status===200) {
              
              toast.success("Password Changed Successfully!");
              router.refresh();
              router.push("/login");
            }
          } catch (err: any) {
            toast.error("Error try again!");
          } finally {
            setLoading(false);
          }
        
      };

    return {password, setPassword,loading, reset,verified};
};
export default useReset;