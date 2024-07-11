import ProfileDetails from "@/(components)/profileDetails/profileDetails";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


const Profile=async()=> {
    const session = await getServerSession(authOptions);
  return (
    <div>
        {/* <div style={{filter:"drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold bg-brand_primary_blue p-20 text-gray-700">
            <span>{}</span>
          </div> */}
      
      <ProfileDetails name={session?.user.name} email={session?.user.email}/>
    </div>
  );
};
export default Profile;
