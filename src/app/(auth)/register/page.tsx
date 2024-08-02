import Logo from "@/(components)/logo/Logo";
import RegisterForm from "@/(components)/registerForm/registerForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | URL Shortner App",
  openGraph: {
    title: "Register | URL Shortener App",
    description: "Register yourself to shorten unlimited Urls.",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/assets/images/linkly.svg`,
        alt: "Linkly",
      },
    ],
    url: `${process.env.NEXTAUTH_URL}/dashboard`,
    
  },
};


function Register()
{
    return(
        <>
        <header className="mt-[40px]">
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[114px] lg:mt-[216px] mt-[65px] mx-[26px] md:mx-0">
            <div className="mb-[46px] flex flex-col gap-[20px] items-center justify-center">
            <div>
            <p className="font-extrabold text-center lg:text-[60px] text-[35px] leading-[41.48px] lg:leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
                Shorten Your Loooong Links &#58;&#41;
              </p>
            </div>
            <div className="md:w-[634px]">
            <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
            </div>
            </div>
          <RegisterForm/>     
        </div>
        <footer className="mb-[30px]">
        <div className="flex items-center justify-center text-text_secondary"> <Link className="text-brand_primary_blue underline" href={"/login"}>Sign In</Link> &nbsp; if already registered</div>
      </footer>
      </>
    );

}
export default Register;
