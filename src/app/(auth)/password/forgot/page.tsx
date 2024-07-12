"use client"
import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import Logo from "@/(components)/logo/Logo";
import Link from "next/link";
import useForgot from "./useForgot";

function ForgotPassword()
{
  const {email, setEmail,loading,forgot}=useForgot();
    return(
        <>
        <header>
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Reset Password</p>
            
            </div>
            <form onSubmit={forgot} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex  flex-col gap-[32px] w-[659px]">
                    <p className="text-text_secondary text-lg font-semibold">Enter your Email to reset password:</p>
                <InputField type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                </div>
                
                <Button type="submit" width="200px" text="Submit" disabled={loading}/>
                <div>
                <p style={{filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="flex items-center justify-center text-text_secondary">-&nbsp;OR&nbsp;-</p>
                <Link href={'/login'} className="font-bold hover:underline hover:decoration-brand_primary_blue text-brand_primary_blue">Login here</Link>
                
                </div>
                </form>        
        </div>
        
      </>
    );

}
export default ForgotPassword;
