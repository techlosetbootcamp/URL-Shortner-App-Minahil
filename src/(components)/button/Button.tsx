import { buttonType } from "@/constants/types/allTypes";

function Button({text}:buttonType){
    return(
        <button style={{ width: "268px", filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} type="submit" className="bg-brand_primary_blue border border-brand_primary_blue font-semibold text-white rounded-[48px] py-[21px] pr-[25.19px] pl-[25px]" >{text}</button>
    );

}
export default Button;