"use client"
import ProfileDetails from "@/(components)/profileDetails/profileDetails";
import { useAppSelector } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";

const Profile = () => {
  const { user, isLoading, isError }=useFetchUser();

  return (
    <div>
      <ProfileDetails name={user?.name} email={user?.email}/>
    </div>
  );
};

export default Profile;
