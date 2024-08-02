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
      {/* <div className="px-6 py-4 mt-20 flex flex-col gap-7 items-center justify-center">
      <div className="flex items-center justify-center">
        <div
          style={{
            filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",
          }}
          className="rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold bg-brand_primary_blue p-20 text-white"
        >
          <span>{getInitials(user?.name)}</span>
        </div>
      </div>
      <div className="mt-4 text-white">
        <div className="flex justify-center mb-2">
          <div className="font-semibold mr-2">Name:</div>
          <div>{user?.name}</div>
        </div>
        <div className="flex items-center">
          <div className="font-semibold flex justify-center mr-2">Email:</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/profile/edit">
          <Button text="Edit" width="200px" />
        </Link>
      </div>
    </div> */}
       <header>
        <div className="flex xs:items-start sm:items-start sm:justify-between items-center justify-center xs:justify-between xxl:ml-[52px] xxl:mr-[55px] mx-[26px] mt-[44px] mb-[38px]">
          <div className="mt-[10px]">
            <Logo />
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
      <ProfileDetails />
    </div>
  );
};

export default Profile;
