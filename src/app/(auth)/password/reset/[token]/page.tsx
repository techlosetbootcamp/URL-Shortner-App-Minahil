import Logo from "@/(components)/logo/Logo";
import ResetPassForm from "@/(components)/resetPassForm/ResetPassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | URL Shortner App",

  openGraph: {
    title: "Reset Password | URL Shortener App",
    description: "Reset your password.",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/assets/images/linkly.svg`,
        alt: "Linkly",
      },
    ],
    url: `${process.env.NEXTAUTH_URL}/dashboard`,
    
  },
};


const ResetPassword=({params}:{
  params:{token:string}
})=>
{
    return(
        <>
        
        <header className="mt-[40px]">
          <Logo/>
        </header>
        <div className="flex flex-col items-center justify-center mb-[100px] mt-[100px] lg:mb-[262px] lg:mt-[216px] mx-[26px] lg:mx-0">
        <div className="flex flex-col gap-[20px] items-center xxl:mb-[46px] mb-[24px]">
          <p className="font-extrabold text-center xxl:text-[60px] text-[35px] leading-[41.48px] xxl:leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
            Reset Password
          </p>
          <div className="md:w-[634px]">
            <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">
              Linkly is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </p>
          </div>
        </div>
            <ResetPassForm token={params.token}/>       
        </div>
        
      </>
    );

}
export default ResetPassword;
