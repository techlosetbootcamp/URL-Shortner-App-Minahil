import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/InputField";
import Logo from "@/(components)/logo/Logo";
import Link from "next/link";

function Register()
{
    return(
        <>
        <header className="mt-[40px]">
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[136px] mt-[126px]">
            <div className="mb-[46px] flex flex-col gap-[20px] items-center justify-center">
            <div>
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">Shorten Your Loooong Links &#58;&#41;</p>
            </div>
            <div className="w-[634px]">
            <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
            </div>
            </div>
            <form className="flex flex-col gap-[32px] items-center justify-center" action="">
            <div className="flex flex-col gap-[32px] w-[659px]">
                <InputField type="email" placeholder="Email"/>
                {/* <input className="shadow-custom border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[21px] pr-[25.19px] pl-[25px]" type="email" placeholder="tgt" /> */}
                {/* <input className="shadow-custom border-4 bg-input_bg_clr border-brand_primary_blue opacity-10 rounded-[48px] py-[21px] pr-[25.19px] pl-[25px]" type="email" placeholder="jh" /> */}
                {/* <button style={{ width: "268px"}} type="submit" className="bg-brand_primary_blue text-text_secondary rounded-[48px] py-[21px] pr-[25.19px] pl-[25px]" >jjknk</button> */}
                <InputField type="text" placeholder="Name"/>
                <InputField type="password" placeholder="Password"/>
                <InputField type="password" placeholder="Confirm Password"/>
                
            </div>
            <div><Button text="Register" width="268px"/></div>
            
                
                
                </form>        
        </div>
        <footer className="mb-[30px]">
        <div className="flex items-center justify-center text-text_secondary"> <Link className="text-brand_primary_blue underline" href={"/login"}>Sign In</Link> &nbsp; if already registered</div>
      </footer>
      </>
    );

}
export default Register;
