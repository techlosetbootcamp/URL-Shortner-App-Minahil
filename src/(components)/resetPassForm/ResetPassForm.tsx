"use client"
import useReset from "@/app/(auth)/password/reset/[token]/useReset";
import InputField from "../input/Input";
import Button from "../button/Button";
import Loader from "../loader/Loader";

type tokenProps={
    token:string
}
const ResetPassForm=({token}:tokenProps)=>{
    const {password, setPassword,loading, reset,verified}=useReset(token);
    if(!verified || loading) return <Loader/>
    return(
        <form onSubmit={reset} className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] md:w-[659px] sm:w-[559px] xs:w-[359px]">
                <InputField type="password" placeholder="Enter new Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Confirm Password"/>
                </div>
                
                <Button text="Set Password" disabled={loading} paddingRight="100px" paddingLeft="100px"/>
                </form> 
    );
};
export default ResetPassForm;