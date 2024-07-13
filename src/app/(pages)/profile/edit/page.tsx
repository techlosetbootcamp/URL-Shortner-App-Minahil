"use client"
import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import useFetchUser from "@/hooks/useFetchUser";


const EditProfile=()=>{
    const { user, isLoading, isError }=useFetchUser();
    if(isLoading) return <div className="text-white">Loading....</div>
    return(
        <div>
            
        <form className="flex mt-20 gap-7 flex-col items-center justify-center text-text_secondary">
            <div className="flex gap-2 items-center justify-between">
            <div>Name: </div>
            <InputField type="text" value={user?.name}/>
            </div>
            <div className="flex gap-2 items-center justify-between">
            <div>Email: </div>
            <InputField type="text" value={user?.email}/>
            </div>

            <Button text="Save Changes" width="200px"/>
            
            
        </form>
        </div>
    );
}
export default EditProfile;