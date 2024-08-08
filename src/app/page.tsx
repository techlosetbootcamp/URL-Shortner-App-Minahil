import Button from "@/(components)/button/Button";
import Logo from "@/(components)/logo/Logo";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import LinkTable from "@/(components)/linkData/LinkData";
import UrlShortenForm from "@/(components)/urlShortenForm/urlShortenForm";
import FreeAccess from "@/(components)/freeAccess/FreeAccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Manage and shorten your URLs with ease using our app.",
  openGraph: {
    title: "URL Shortener App",
    description: "Manage and shorten your URLs with ease using our app.",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/assets/images/linkly.svg`,
        alt: "Linkly",
      },
    ],
    url: `${process.env.NEXTAUTH_URL}/dashboard`,
  },
};
export default function Home() {
  return (
    <div className="">
      <header>
        <div className="flex items-center justify-between xxl:ml-[52px] ml-[26px] mr-[26px] xxl:mr-[55px] mt-[40px] xxl:mb-[130px] mb-[65px]">
          <Logo />

          <div className="flex items-center gap-[20px]">
            <Link href={"/login"}>
              <div className="flex items-center justify-center rounded-[48px] bg-input_bg_clr border border-input_border_clr xxl:py-[21px] md:py-[16px] py-[8px] pr-[25.19px] pl-[25px]">
                <div className="text-white flex gap-[10px] items-center">
                  <div>
                    <p className="text-[16px] leading-[18px] font-semibold">
                      Login
                    </p>
                  </div>
                  <div>
                    <CiLogin className="text-text_secondary h-[28px] w-[20px]" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href={"/register"} className="hidden md:flex">
              <Button
                text="Register Now"
                paddingLeft="36.98px"
                paddingRight="37.02px"
              />
            </Link>
          </div>
        </div>
      </header>
      <main className="">
        <div className="flex flex-col xxl:ml-[153px] xxl:mr-[154px] mr-[26px] ml-[26px]">
          <div className="flex flex-col items-center justify-center mb-[40px]">
            <div className="flex flex-col gap-[20px] items-center xxl:mb-[46px] mb-[24px]">
              <p className="font-extrabold text-center xxl:text-[60px] text-[35px] leading-[41.48px] xxl:leading-[80.01px] animate-text bg-gradient-to-r from-brand_primary_blue via-brand_primary_pink to-gradient_clr_3 bg-clip-text text-transparent">
                Shorten Your Loooong Links &#58;&#41;
              </p>
              <div className="xxl:w-[634px]">
                <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">
                  Linkly is an efficient and easy-to-use URL shortening service
                  that streamlines your online experience.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <UrlShortenForm />

              <div className="xxl:mt-[16px] mt-[24px] flex flex-col items-center gap-[16px]">
                <FreeAccess />
              </div>
            </div>
          </div>

          <LinkTable />
        </div>
      </main>
    </div>
  );
}
