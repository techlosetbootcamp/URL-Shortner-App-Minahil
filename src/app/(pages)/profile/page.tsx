import DropdownButton from "@/(components)/dropdownButton/dropdownButton";
import Logo from "@/(components)/logo/Logo";
import ProfileDetails from "@/(components)/profileDetails/profileDetails";
import { Metadata } from "next";
import { FaBell } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Profile | URL Shortner App"
};


const Profile = () => {
  return (
    <div className="">
       <header className="mt-[44px]">
        <div className="flex items-center justify-between mx-[52px]">
          <Logo />
          <div className="flex gap-[20px]">
            <div className="flex items-center justify-center w-[191px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25] pl-[25px]">
              <DropdownButton/>
            </div>

            <div style={{filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="cursor-pointer relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue flex items-center justify-center">
              <div className="text-white">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </header>
      <ProfileDetails />
    </div>
  );
};

export default Profile;
