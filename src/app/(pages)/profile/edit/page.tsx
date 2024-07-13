import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const EditProfile=async()=>{
    const session = await getServerSession(authOptions);
    return(
        <div>
            
        <form className="flex mt-20 gap-7 flex-col items-center justify-center text-text_secondary">
            <div className="flex gap-2 items-center justify-between">
            <div>Name: </div>
            <InputField type="text" value={session?.user.name}/>
            </div>
            <div className="flex gap-2 items-center justify-between">
            <div>Email: </div>
            <InputField type="text" value={session?.user.email}/>
            </div>

            <Button text="Save Changes" width="200px"/>
            
            
        </form>
        </div>
    );
}
export default EditProfile;