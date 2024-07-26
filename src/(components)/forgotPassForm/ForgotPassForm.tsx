"use client"
import useForgotPassForm from "@/(components)/forgotPassForm/useForgotPassForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Link from "next/link";

const ForgotPassForm=()=>{
    const {email, setEmail,loading,forgot}=useForgotPassForm();
    return(
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
    );
};
export default ForgotPassForm;