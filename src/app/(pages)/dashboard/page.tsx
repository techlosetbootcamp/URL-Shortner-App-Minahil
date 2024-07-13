"use client"
import { FaRegClock } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import Logo from "@/(components)/logo/Logo";
import { TfiLink } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import ToggleSwitch from "@/(components)/toggleSwitch/ToggleSwitch";
import LinkTable from "@/(components)/linkData/LinkData";
import DropdownButton from "@/(components)/dropdownButton/dropdownButton";
import { useAppSelector } from "@/hooks";

const Dashboard=()=> {
  const user=useAppSelector((state)=>state.user.user);
  console.log(user.name);
  //const session = await getServerSession(authOptions);
  return (
    <>
      <header>
        <div className="flex items-center justify-between mx-[52px] mt-[44px]">
          <Logo />

          <div className="relative flex flex-col gap-[32px] w-[659px] lg:w-[659px] 2xl:w-[1100px]">
            <i className="absolute left-[25px] top-[24px] text-text_secondary">
              <TfiLink className="w-[25px] h-[28px]" />
            </i>
            <input
              style={{
                borderColor:
                  "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
              }}
              className="shadow-custom border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[24px] pr-[25.19px] pl-[70px] text-text_secondary"
              type="text"
              placeholder="Enter the link here"
            />

            <button
              style={{
                width: "183px",
                filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
              }}
              type="submit"
              className="absolute right-2 top-[5.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white rounded-[48px] py-[21px] pr-[25.05px] pl-[25px]"
            >
              Shorten Now!
            </button>
          </div>

          <div className="flex gap-[20px]">
            <div className="flex items-center justify-center w-[191px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25] pl-[25px]">
            {/* <button
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",

                marginBottom: "4px",
              }}
              className="flex items-center justify-center rounded-lg w-[100px] text-sm border-b-2 bg-brand_primary_blue"
              role="menuitem"
             
            >
              Profile
            </button>

            <button
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(220, 38, 38, 0.38))",
              }}
              className="items-center justify-center w-[100px] rounded-lg flex text-sm bg-red-600"
              role="menuitem"
             
            >
              Logout
            </button> */}
                <DropdownButton username={user?.name}/>
                {/* <button style={{
              
              filter: "drop-shadow(10px 9px 10px rgba(220, 38, 38, 0.38))",
            }}
            className="w-[10px] rounded-lg items-center justify-center text-sm bg-red-600"
            role="menuitem"
        
          >
            Profile
          </button> */}
                
              
            </div>

            <div
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",
              }}
              className="relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue flex items-center justify-center"
            >
              <div className="text-white">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[15px] text-text_secondary mb-[38px] mt-[19px]">
          <ToggleSwitch />
          <div>Auto paste from clipboard</div>
        </div>
      </header>

      <div className="flex mb-[41.5px] items-center justify-center font-bold gap-[64px] text-nav_clr bg-input_bg_clr h-[70px]">
        <div className="flex gap-[10px] items-center"><FaRegClock/>History</div>
        <div className="flex gap-[10px] items-center"><IoStatsChartOutline/>Statistics</div>
        <div className="flex gap-[10px] items-center"><IoSettingsOutline/>Settings</div>
      </div>

      <div className="flex items-center justify-between mx-[163px] mb-[28px]">
        <div className="text-text_secondary font-bold text-[20px]">History <span>(143)</span></div>
        <div className="bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
          <CiFilter/>
          <div>Filter</div>
        </div>
      </div>
              <div className="mx-[153px]"><LinkTable/></div>
      
    </>
  );
}
export default Dashboard;
