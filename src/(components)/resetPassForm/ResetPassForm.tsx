"use client"
import useReset from "@/app/(auth)/password/reset/[token]/useReset";
import InputField from "../input/Input";
import Button from "../button/Button";

type tokenProps={
    token:string
}
const ResetPassForm=({token}:tokenProps)=>{
    const {password, setPassword,loading, reset,verified}=useReset(token);
    if(!verified) return <div>Loading...</div>
    return(
        <form onSubmit={reset} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="password" placeholder="Enter new Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Confirm Password"/>
                </div>
                
                <Button text="Set Password" disabled={loading}/>
                </form> 
    );
};
export default ResetPassForm;