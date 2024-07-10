import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";

function EditProfile(){
    return(
        <div>
            <header><Button text="Logout" width="200px"/></header>
        <form className="flex flex-col items-center justify-center text-text_secondary">
            <div className="flex items-center justify-between">
            <div>Name: </div>
            <InputField type="text" value={"Minahil"}/>
            </div>
            <div className="flex items-center justify-between">
            <div>Username: </div>
            <InputField type="text" value={"minahilismail"}/>
            </div>

            <Button text="Save Changes" width="200px"/>
            
            
        </form>
        </div>
    );
}
export default EditProfile;