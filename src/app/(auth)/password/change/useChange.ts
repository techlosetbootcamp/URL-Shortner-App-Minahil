"use client"
import { AxiosInstance } from "@/utils/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useChange=()=>{

    const [loading, setLoading] = useState(false);
    const [newpassword, setNewPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const change = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await AxiosInstance.post("/password/change", {
              newpassword
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

    return {loading, error,newpassword,setNewPassword,oldpassword,setOldPassword,change};
};
export default useChange;