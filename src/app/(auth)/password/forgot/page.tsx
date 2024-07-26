import Logo from "@/(components)/logo/Logo";
import ForgotPassForm from "@/(components)/forgotPassForm/ForgotPassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | URL Shortner App"
};


function ForgotPassword()
{
    return(
        <>
        <header>
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Reset Password</p>
            
            </div>
            <ForgotPassForm/>        
        </div>
        
      </>
    );

}
export default ForgotPassword;
