"use client"
import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import Link from "next/link";
import useEdit from "./useEdit";


const EditProfile=()=>{
    const { user, isLoading, isError,name, setName,newEmail, setEmail,handleSaveChanges}=useEdit();
    if(isLoading) return <div className="text-white">Loading....</div>
    return(
        <div>
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

        <Button onClick={()=>handleSaveChanges} text="Save Changes" width="200px" />
        <Link href={'/password/change'}>
          <Button text="Change Password" width="200px" />
        </Link>
      </form>
    </div>
    );
}
export default EditProfile;