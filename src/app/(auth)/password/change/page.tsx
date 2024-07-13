"use client"
import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import Logo from "@/(components)/logo/Logo";
import Link from "next/link";
import useChange from "./useChange";

const ChangePassword=async()=>
{
  
  const {loading, error,newpassword,setNewPassword,oldpassword,setOldPassword,change}=useChange()
    return(
        <>
        <header>
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Change Password</p>
           
            </div>
            <form onSubmit={change} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="password" placeholder="Old Password" value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="New Password" value={oldpassword} onChange={(e)=>setOldPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Confirm Password"/>
                </div>
                
                <Button text="Change Password" disabled={loading}/>
                </form>        
        </div>
        <footer className="mb-[30px]">
        <div className="flex items-center justify-center text-text_secondary"> <Link className="text-brand_primary_blue underline" href={"/register"}>Register</Link> &nbsp; if not already registered</div>
      </footer>
      </>
    );

}
export default ChangePassword;
