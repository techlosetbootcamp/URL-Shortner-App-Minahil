import Logo from "@/(components)/logo/Logo";
import { FaBell } from "react-icons/fa";
import LinkTable from "@/(components)/linkData/LinkData";
import DropdownButton from "@/(components)/dropdownButton/dropdownButton";
import UrlShortenForm from "@/(components)/urlShortenForm/urlShortenForm";

import { Metadata } from "next";
import { MENU_ITEMS } from "@/constants/constants";
export const metadata: Metadata = {
  title: "Dashboard | URL Shortner App",
  description: "Manage and shorten your URLs with ease using our app.",
  openGraph: {
    title: "Dashboard | URL Shortener App",
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

const Dashboard = () => {
  return (
    <>
      <header>
        <div className="flex xs:items-start sm:items-start sm:justify-between items-center justify-center xs:justify-between xxl:ml-[52px] xxl:mr-[55px] mx-[26px] mt-[44px] mb-[38px]">
          <div className="mt-[10px]">
            <Logo />
          </div>

          <div className="hidden xl:flex">
            <UrlShortenForm />
          </div>

          <div className="flex items-center mt-[7px] gap-[20px]">
            <div className="hidden xs:flex sm:flex items-center rounded-[48px] bg-input_bg_clr border border-input_border_clr xxl:py-[12.5px] py-[5px] xxl:pl-[34.41px] xxl:pr-[34.59px] xs:px-[34.31px] px-[20.31px]">
              <DropdownButton />
            </div>

            <div
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",
              }}
              className="cursor-pointer relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue py-[21px] px-[21.98px] hidden md:flex items-center justify-center"
            >
              <div className="text-white flex items-center justify-center">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex mb-[26px] items-center justify-center font-bold gap-[64px] text-nav_clr bg-input_bg_clr h-[70px] w-full px-[26px] md:px-0">
        {MENU_ITEMS.map((item, index) => (
          <div key={index} className="flex gap-[10px] items-center">
            <item.icon className="h-[30px] w-[30px] sm:h-[16px] sm:w-[16px]" />
            <div className="hidden sm:flex">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="xl:ml-[153px] xl:mr-[154px] ml-[26px] mr-[26px] lg:ml-[40px] lg:mr-[41px]">
        <LinkTable />
      </div>
    </>
  );
};
export default Dashboard;
