import EditProfileForm from "@/(components)/editProfileForm/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | URL Shortner App"
};



const EditProfile=()=>{
    
    return(
        <div>
      <EditProfileForm/>
    </div>
    );
}
export default EditProfile;