"use client"
import Button from "../button/Button";
import InputField from "../input/Input";
import useLoginForm from "./useLoginForm";

function LoginForm(){
    const [email, setEmail,password, setPassword,loading,login]=useLoginForm();
    return(
        <form className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                </div>
                
                <Button text="Login" width="268px" onClick={login}/>
                </form>   
    );
}
export default LoginForm;