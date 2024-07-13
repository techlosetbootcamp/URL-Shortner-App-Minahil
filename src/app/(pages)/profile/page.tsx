"use client"
import ProfileDetails from "@/(components)/profileDetails/profileDetails";
import { useAppSelector } from "@/hooks";

const Profile = () => {
  const userProfile = useAppSelector((state) => state.user);

  return (
    <div>
      <ProfileDetails name={userProfile.user.name} email={userProfile.user.email}/>
    </div>
  );
};

export default Profile;
