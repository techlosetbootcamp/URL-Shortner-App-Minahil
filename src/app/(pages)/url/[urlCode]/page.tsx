import Logo from "@/(components)/logo/Logo";
import { IoIosArrowDown } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import EditUrlForm from "@/(components)/editUrlForm/EditUrlForm";
import { Metadata } from "next";
import DropdownButton from "@/(components)/dropdownButton/dropdownButton";

type Props={
  params:{
    urlCode: string;
  };
};

export const generateMetadata = ({params}:Props):Metadata=>{
  return{
    title:`${params.urlCode} | Edit`,
  };
};

const EditUrl=(
  {params}:Props
)=> {
  
  return (
    <>
      <header className="mt-[44px]">
        <div className="flex items-center justify-between mx-[52px]">
          <Logo />
          <div className="flex gap-[20px]">
            <div className="flex items-center justify-center w-[191px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25] pl-[25px]">
            <DropdownButton/>
            </div>

            <div style={{filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue flex items-center justify-center">
              <div className="text-white">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <form onSubmit={handleEdit}
        className="flex flex-col gap-[32px] items-center justify-center mt-[352px] mb-[435px]"
        action=""
      >
        <div className="relative flex flex-col gap-[32px] w-[1100px]">
          <i className="absolute left-[25px] top-[24px] text-text_secondary">
            <TfiLink className="w-[25px] h-[28px]" />
          </i>
          
          <div className="flex items-center shadow-custom border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[21px] pr-[25.19px] pl-[70px] text-text_secondary">
            <span className="text-text_secondary">{DOMAIN}</span>
            <input
              value={editablePart}
              onChange={(e)=>setEditablePart(e.target.value)}
              style={{
                borderColor:
                  "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
              }}
              className="w-full bg-transparent text-text_secondary focus:outline-none"
              type="text"
            />
          </div>
        </div>
   
        <Button type="submit" text="Edit Url" width="268px"/>
      </form> */}
      <EditUrlForm urlCode={params.urlCode}/>
    </>
  );
}
export default EditUrl;
