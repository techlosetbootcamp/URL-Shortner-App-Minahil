import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/InputField";
import Logo from "@/(components)/logo/Logo";

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
            <form className="flex flex-col gap-[32px] items-center justify-center" action="">
                <div className="flex  flex-col gap-[32px] w-[659px]">
                    <p className="text-text_secondary text-lg font-semibold">Enter your Email to reset password:</p>
                <InputField type="email" placeholder="Email"/>
                </div>
                
                <Button text="Submit"/>
                </form>        
        </div>
        
      </>
    );

}
export default ForgotPassword;
