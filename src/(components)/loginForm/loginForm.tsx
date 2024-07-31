"use client"
import Link from "next/link";
import Button from "../button/Button";
import InputField from "../input/Input";
import useLoginForm from "./useLoginForm";

function LoginForm(){
    const {email, setEmail,password, setPassword,loading,login}=useLoginForm();
    return(
        <form onSubmit={login} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                
                <div style={{filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="flex items-center justify-center text-text_secondary">Forgot Password? &nbsp; <Link href={'/password/forgot'} className="font-bold hover:underline hover:decoration-brand_primary_blue text-brand_primary_blue">Reset here</Link></div>
                
                </div>
                
                <Button type="submit" text="Login" paddingRight="112.52px" paddingLeft="112.48px" disabled={loading} />
                </form>   
    );
}
export default LoginForm;