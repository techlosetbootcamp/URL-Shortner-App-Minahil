"use client";
import Link from "next/link";
import Button from "../button/Button";
import useProfileDetails from "./useProfileDetails";
import Loader from "../loader/Loader";

const ProfileDetails = () => {
  const { getInitials, user, isLoading, isError } = useProfileDetails();
  if (isLoading || isError) return <Loader />;
  return (
    <div className="px-6 py-4 mt-20 flex flex-col gap-7 items-center justify-center">
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
          <Button text="Edit" paddingRight="100px" paddingLeft="100px" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
