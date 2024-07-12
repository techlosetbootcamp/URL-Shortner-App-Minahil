import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const EditProfile=async()=>{
    const session = await getServerSession(authOptions);
    return(
        <div>
            <header><Button text="Logout" width="200px"/></header>
        <form className="flex flex-col items-center justify-center text-text_secondary">
            <div className="flex items-center justify-between">
            <div>Name: </div>
            <InputField type="text" value={session?.user.name}/>
            </div>
            <div className="flex items-center justify-between">
            <div>Email: </div>
            <InputField type="text" value={session?.user.email}/>
            </div>

            <Button text="Save Changes" width="200px"/>
            
            
        </form>
        </div>
    );
}
export default EditProfile;