"use client"
import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import Logo from "@/(components)/logo/Logo";
import useReset from "./useReset";

const ResetPassword=({params}:{
  params:{token:string}
})=>
{
  const {password, setPassword,loading, reset,verified}=useReset(params.token);
  if(!verified) return <div>Loading...</div>
    return(
        <>
        <header>
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
            <div className="mb-[46px] flex flex-col items-center justify-center">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Set New Password</p>
           
            </div>
            <form onSubmit={reset} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="password" placeholder="Enter new Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Confirm Password"/>
                </div>
                
                <Button text="Set Password" disabled={loading}/>
                </form>        
        </div>
        
      </>
    );

}
export default ResetPassword;
