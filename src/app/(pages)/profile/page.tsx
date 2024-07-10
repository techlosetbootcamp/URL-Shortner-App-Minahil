import Button from "@/(components)/button/Button";
import Link from "next/link";

function Profile(){
    return(
        <div>
            <header><Button text="Logout" width="200px"/></header>
        <div className="flex flex-col items-center justify-center text-text_secondary">
            <div className="flex items-center justify-between">
            <div>Name: </div>
            <div>Minahil</div>
            </div>
            <div className="flex items-center justify-between">
            <div>Username: </div>
            <div>minahilismail</div>
            </div>
            <Link href="/profile/edit">
            <Button text="Edit" width="200px"/>
            </Link>
            
        </div>
        </div>
    );
}
export default Profile;