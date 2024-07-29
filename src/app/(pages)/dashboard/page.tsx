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

const Dashboard=()=> {
  
  return (
    <>
      <header>
        <div className="flex items-center justify-between mx-[52px] mt-[44px]">
          <Logo />
          {/* <div>{(link?.user_email)? <div className="text-white flex items-center gap-[10px]"> <button style={{filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10))"}} className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]" onClick={()=>handleEdit(link?.urlCode!)}><GrEdit/></button><button onClick={()=>handleDelete(link?.urlCode!)} className="flex items-center justify-center p-[13px] px-[13.09px] border border-input_border_clr bg-input_bg_clr rounded-[48px]"><AiOutlineDelete/></button> </div>:""}</div> */}
       {/* <div className="flex items-center justify-between mb-[28px]">
          <div className="text-text_secondary font-bold text-[20px]">
            History <span>({filteredLinks?.length})</span>
          </div>
          <div className="bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
            <CiFilter />
            <button className=""><Filter onFilterChange={handleFilterChange} /></button>
          </div>
        </div> */}
        {/* py-[21px] pr-[25.19px] pl-[25px] */}
        
          <div className=" mt-[50px]"><UrlShortenForm/></div>
          
          {/* <div className="flex items-center gap-[10px]">
          <div className="text-active_link_clr">Active</div>
          <div className="h-[35px] w-[35px] text-white rounded-[31px] p-[10px] bg-active_link_clr opacity-5">
            <TfiLink/>
          </div>
        </div> */}
{/* <div className="flex items-center gap-[10px] p-[10px]">
          <div className="text-inactive_link_clr">Active</div>
          <div className={`h-[35px] w-[35px] rounded-[31px] px-[8px] py-[3.5px] bg-inactive_link_clr} opacity-15 flex items-center justify-center`}>
            <TfiLink className="text-white" />
          </div>
        </div> */}
        
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
                <DropdownButton />
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
              className="cursor-pointer relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue flex items-center justify-center"
            >
              <div className="text-white">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <form onSubmit={shorten} className="relative flex flex-col gap-[32px] w-[659px] lg:w-[659px] 2xl:w-[1100px]">
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
              placeholder="Enter the link here" value={url} onChange={(e)=>setUrl(e.target.value)} disabled={loading}
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
          </form> */}
      <div className="flex mb-[41.5px] items-center justify-center font-bold gap-[64px] text-nav_clr bg-input_bg_clr h-[70px]">
        <div className="flex gap-[10px] items-center"><FaRegClock/>History</div>
        <div className="flex gap-[10px] items-center"><IoStatsChartOutline/>Statistics</div>
        <div className="flex gap-[10px] items-center"><IoSettingsOutline/>Settings</div>
      </div>
      {/* <div className=" hover:flex hidden items-center justify-between mb-[28px]">
          <div className="text-text_secondary font-bold text-[20px]">
            History <span>({filteredLinks?.length})</span>
          </div>
          <div className="bg-brand_grey border border-input_border_clr h-[44px] text-input_txt_clr font-bold text-[15px] rounded-[48px] flex items-center justify-center py-[21px] w-[113.19px] pr-[25.19px] pl-[25px] gap-[10px]">
            <CiFilter />
            <div>Filter</div>
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div> */}
        

      
              <div className="mx-[153px] "><LinkTable/></div>
      {/* <div style={{background: 'linear-gradient(180deg, rgba(11, 16, 27, 0) 15.74%, rgba(11, 16, 27, 0.57) 50.38%)'}} className="absolute xxl:w-[1421px] xxl:h-[148px] xxl:left-[153px] xxl:top-[1026px] filter blur-[21px] backdrop-blur-[5px] ">
      <div className="absolute text-white">hello</div>
      </div> */}

      
    </>
  );
}
export default Dashboard;
