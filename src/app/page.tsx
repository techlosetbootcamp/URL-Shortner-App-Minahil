import Button from "@/(components)/button/Button";
import Logo from "@/(components)/logo/Logo";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import ToggleSwitch from "@/(components)/toggleSwitch/ToggleSwitch";
import LinkTable from "@/(components)/linkData/LinkData";
import UrlShortenForm from "@/(components)/urlShortenForm/urlShortenForm";
import FreeAccess from "@/(components)/freeAccess/FreeAccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Manage and shorten your URLs with ease using our app.",
  // openGraph: {
  //   title: "URL Shortener App",
  //   description: "Manage and shorten your URLs with ease using our app.",
  //   images:`${oglImg}`,
  //   url: "http://localhost:3000/",
  //   type: "website",
  // },
};
export default function Home() {
  return (
   <>
      <header>
        <div className="flex items-center justify-between xxl:ml-[52px] xxl:mr-[55px] mt-[40px] xxl:mb-[130px]">
          <Logo />
          {/* <div>
    <div className="flex items-center justify-center relative">
      <p className="font-extrabold text-[36.91px] bg-clip-text leading-[45.44px] bg-gradient-to-br from-brand_primary_pink from-50% to-brand_primary_blue text-transparent mt-[40px]">
        Linkly
      </p>
      <sup className="absolute top-12 left-[108px] text-white opacity-50">
        &#174;
      </sup>
    </div>
    </div> */}
          <div className="flex items-center gap-[20px]">
            <Link href={"/login"}>
              <div className="flex items-center justify-center w-[123.19px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25.19px] pl-[25px]">
                <div className="text-white flex gap-[10px] items-center">
                  <div>
                    <p className="text-[16px] font-semibold">Login</p>
                  </div>
                  <div>
                    <CiLogin className="text-text_secondary h-[28px] w-[20px]" />
                  </div>
                </div>
              </div>
            </Link>
           
        {/* <div className="flex justify-center items-center min-h-[25vh]">
      <div className="relative w-16 h-16 bg-white">
        <div className="absolute border-t-4 drop-shadow-2xl shadow-white border-blue-600 border-solid rounded-full w-full h-full animate-spin delay-300"></div>
      </div>
    </div> */}
  
            {/* <div className="flex items-center justify-center gap-[15px] text-text_secondary mb-[38px] mt-[32px]">
        <ToggleSwitch onChange={setAutoPaste} />
        <div>Auto paste from clipboard</div>
      </div> */}
            <Link href={"/register"}>
              <Button text="Register Now" width="178px" />
            </Link>
          </div>
        </div>
      </header>
       <main className="">
      <div className="flex flex-col xxl:ml-[153px] xxl:mr-[154px]">
        <div className="flex flex-col items-center justify-center mb-[40px]">
          <div className="flex flex-col gap-[20px] items-center mb-[46px]">
            <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
              Shorten Your Loooong Links &#58;&#41;
            </p>
            <div className="w-[634px]">
              <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">
                Linkly is an efficient and easy-to-use URL shortening service
                that streamlines your online experience.
              </p>
            </div>
          </div>
          {/* <button
          style={{
            width: "183px",
            filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
          }}
          type="submit"
          className="absolute right-2 top-[5.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white rounded-[48px] py-[21px] pr-[36.02px] pl-[35.98px]"
        >
          Shorten Now!
        </button> */}
          <div className="flex flex-col items-center">
            <UrlShortenForm/>

            <div className="mt-[16px] flex flex-col items-center gap-[16px]">
             
               
              
                {/* <div className="flex items-center">
      <div
        onClick={toggleSwitch}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-400"
        } relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
        />
      </div>
     
    </div> */}

{/* <div className="text-text_secondary">
                You can create <b className="text-brand_primary_pink">{FREE_URL_LIMIT - shortenedUrlsCount}</b>{" "}
                more links. Register Now to enjoy Unlimited usage
              </div> */}

              <FreeAccess/>
            </div>
          </div>
        </div>

        <LinkTable />
      </div>
    </main>
    </>
  );
}
