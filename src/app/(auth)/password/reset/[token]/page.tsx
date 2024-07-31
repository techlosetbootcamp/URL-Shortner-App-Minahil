import Logo from "@/(components)/logo/Logo";
import ResetPassForm from "@/(components)/resetPassForm/ResetPassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | URL Shortner App"
};


const ResetPassword=({params}:{
  params:{token:string}
})=>
{
    return(
        <>
        
        <header className="mt-[40px]">
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Reset Password</p>
           
            </div>
            <ResetPassForm token={params.token}/>       
        </div>
        
      </>
    );

}
export default ResetPassword;
