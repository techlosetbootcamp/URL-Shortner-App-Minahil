"use client"

import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { editUser } from "@/redux/slices/userSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useEdit=()=>{
    const dispatch= useAppDispatch();
    const { user, isLoading, isError } = useFetchUser();
    const email=user?.email;
    const [name, setName] = useState(user?.name || ""); 
    const [newEmail, setEmail] = useState(user?.email || ""); 
    
const router=useRouter();
    const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
        
        dispatch(editUser({name,email,newEmail}));
        if(newEmail!=email){
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
          });    
          toast.success("Sign in again"); 
        }  

    };
    return { user, isLoading, isError,name, setName,newEmail, setEmail,handleSaveChanges };
};
export default useEdit;