import Button from "@/(components)/button/Button";
import Logo from "@/(components)/logo/Logo";
import { TfiLink } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import AddUrlForm from "@/(components)/addUrlForm/addUrlForm";

const Add=()=> {
  return (
    <>
      <header className="mt-[44px]">
        <div className="flex items-center justify-between mx-[52px]">
          <Logo />
          <div className="flex gap-[20px]">
            <div className="flex items-center justify-center w-[191px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25] pl-[25px]">
              <div className="text-white flex gap-[10px] items-center">
                <div>
                  <p className="text-[10px]">Welcome</p>
                  <p className="text-[16px] font-semibold">Mohammed</p>
                </div>
                <div>
                  <IoIosArrowDown className="text-text_secondary h-[28px] w-[20px]" />
                </div>
              </div>
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
      <AddUrlForm/>
    </>
  );
};
export default Add;
