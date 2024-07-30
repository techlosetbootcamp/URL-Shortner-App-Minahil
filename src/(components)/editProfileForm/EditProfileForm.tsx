"use client"
import useEditProfileForm from "@/(components)/editProfileForm/useEditProfileForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Link from "next/link";

const EditProfileForm=()=>{
    const { user,isLoading,name, setName,newEmail, setEmail,handleSaveChanges}=useEditProfileForm();
    if(isLoading) return <div className="text-white">Loading....</div>
    return(
        <form onSubmit={handleSaveChanges} className="flex mt-20 gap-7 flex-col items-center justify-center text-text_secondary w-full ">
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

        <Button type="submit" text="Save Changes" width="200px" />
        
      </form>
    );
};
export default EditProfileForm;