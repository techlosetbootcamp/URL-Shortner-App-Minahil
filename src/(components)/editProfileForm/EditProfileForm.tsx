"use client"
import useEditProfileForm from "@/(components)/editProfileForm/useEditProfileForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Link from "next/link";

const EditProfileForm=()=>{
    const { isLoading,name, setName,newEmail, setEmail,handleSaveChanges}=useEditProfileForm();
    if(isLoading) return <div className="text-white">Loading....</div>
    return(
        <form className="flex mt-20 gap-7 flex-col items-center justify-center text-text_secondary">
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
      </form>
    );
};
export default EditProfileForm;