import Button from "@/(components)/button/Button";
import EditProfileForm from "@/(components)/editProfileForm/EditProfileForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Profile | URL Shortner App",
};

const EditProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-9">
      {/* <form className="flex mt-20 gap-7 flex-col items-center justify-center text-text_secondary">
        <div className="flex gap-2 items-center justify-between">
          <div>Name: </div>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div>Email: </div>
          <InputField
            type="text"
            value={newEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button onClick={()=>handleSaveChanges()} text="Save Changes" width="200px" />
        <Link href={'/password/change'}>
          <Button text="Change Password" width="200px" />
        </Link>
      </form> */}
      <div className="flex flex-col items-center justify-center mt-[216px]">
        <div className="mb-[46px] flex flex-col items-center justify-center">
          <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
            Edit Profile
          </p>
        </div>
        <EditProfileForm />
      </div>

      <Link className="" href={"/password/change"}>
        <Button text="Change Password" />
      </Link>
    </div>
  );
};
export default EditProfile;
