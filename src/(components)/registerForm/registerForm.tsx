"use client"
import Button from "../button/Button";
import InputField from "../input/Input";
import useRegisterForm from "./useRegisterForm";

function RegisterForm(){
 const [name,setName,email, setEmail,password, setPassword,loading,register]=useRegisterForm();

    return(
        <form className="flex flex-col gap-[32px] items-center justify-center" action="">
            <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading}/>
                <InputField type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <InputField type="password" placeholder="Confirm Password"/>
                
            </div>
            <div><Button text="Register" width="268px" onClick={register}/></div>
            
                
                
                </form>   
    );
}
export default RegisterForm;