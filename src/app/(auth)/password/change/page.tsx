import ChangePassForm from "@/(components)/changePassForm/ChangePassForm";
import Logo from "@/(components)/logo/Logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Change Password | URL Shortner App"
};


const ChangePassword=()=>
{
    return(
        <>
        <header>
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Change Password</p>
           
            </div>
            <ChangePassForm/> 
        </div>
        <footer className="mb-[30px]">
        <div className="flex items-center justify-center text-text_secondary"> <Link className="text-brand_primary_blue underline" href={"/register"}>Register</Link> &nbsp; if not already registered</div>
      </footer>
      </>
    );

}
export default ChangePassword;
