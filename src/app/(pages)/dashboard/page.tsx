import { FaRegClock } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import Logo from "@/(components)/logo/Logo";
import { FaBell } from "react-icons/fa";
import ToggleSwitch from "@/(components)/toggleSwitch/ToggleSwitch";
import LinkTable from "@/(components)/linkData/LinkData";
import DropdownButton from "@/(components)/dropdownButton/dropdownButton";
import UrlShortenForm from "@/(components)/urlShortenForm/urlShortenForm";

import { Metadata } from "next";
import Filter from "@/(components)/filter/Filter";
export const metadata: Metadata = {
  title: "Dashboard | URL Shortner App",
  description: "Manage and shorten your URLs with ease using our app.",
  // openGraph: {
  //   title: "Dashboard | URL Shortener App",
  //   description: "Manage and shorten your URLs with ease using our app.",
  //   images: "https://th.bing.com/th/id/R.a945d89eb85ba3a23d4cd7eceadf7b10?rik=H%2f49oOqKJYf9%2bg&riu=http%3a%2f%2fcdn.kidscreen.com%2fwp%2fwp-content%2fuploads%2f2016%2f08%2fMasha.jpg%3f25a214&ehk=lu2%2bgeaIxm%2fOk9AmJ7bkyD8qrjHpcn5fYfyQ0Z19N2A%3d&risl=&pid=ImgRaw&r=0", // URL to the OpenGraph image
  //   url: "http://localhost:3000/dashboard",
  //   type: "website",
  // },
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
        <div className="flex gap-[10px] items-center">
          <FaRegClock className="h-[30px] w-[30px] sm:h-[16px] sm:w-[16px]" />
          <div className="hidden sm:flex">History</div>
        </div>
        <div className="flex gap-[10px] items-center">
          <IoStatsChartOutline className="h-[30px] w-[30px] sm:h-[16px] sm:w-[16px]" />
          <div className="hidden sm:flex">Statistics</div>
        </div>
        <div className="flex gap-[10px] items-center">
          <IoSettingsOutline className="h-[30px] w-[30px] sm:h-[16px] sm:w-[16px]" />
          <div className="hidden sm:flex">Settings</div>
        </div>
      </div>

      <div className="xl:ml-[153px] xl:mr-[154px] ml-[26px] mr-[26px] lg:ml-[40px] lg:mr-[41px]">
        <LinkTable />
      </div>
    </>
  );
};
export default Dashboard;
