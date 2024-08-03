import Button from "@/(components)/button/Button";
import EditProfileForm from "@/(components)/editProfileForm/EditProfileForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Profile | URL Shortner App",
  openGraph: {
    title: "Edit Profile | URL Shortener App",
    description: "Edit your profile.",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/assets/images/linkly.svg`,
        alt: "Linkly",
      },
    ],
    url: `${process.env.NEXTAUTH_URL}/dashboard`,
  },
};

const EditProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-9 mx-[26px]">
      <div className="flex flex-col items-center justify-center mt-[216px]">
        <div className="mb-[46px] flex flex-col items-center justify-center">
          <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
            Edit Profile
          </p>
        </div>
        <EditProfileForm />
      </div>

      <Link className="" href={"/password/change"}>
        <Button text="Change Password" paddingLeft="30px" paddingRight="30px" />
      </Link>
    </div>
  );
};
export default EditProfile;
