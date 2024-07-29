import Logo from "@/(components)/logo/Logo";
import { FaBell } from "react-icons/fa";
import AddUrlForm from "@/(components)/addUrlForm/addUrlForm";
import DropdownButton from "@/(components)/dropdownButton/dropdownButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Custom Slug | URL Shortner App"
};

const Add=()=> {
  return (
    <>
      <header className="mt-[44px]">
        <div className="flex items-center justify-between mx-[52px]">
          <Logo />
          <div className="flex gap-[20px]">
            <div className="flex items-center justify-center w-[191px] h-[60px] rounded-[48px] bg-input_bg_clr border border-input_border_clr py-[21px] pr-[25] pl-[25px]">
              <DropdownButton/>
            </div>

            <div style={{filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="cursor-pointer relative w-[58px] h-[58px] rounded-[48px] bg-brand_primary_blue flex items-center justify-center">
              <div className="text-white">
                <sup className="absolute top-4 left-9">2</sup>
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </header>
      <AddUrlForm/>
      {/* <form onSubmit={shorten}
        className="flex flex-col gap-[32px] items-center justify-center mt-[352px] mb-[435px]"
        
      >
        <div className="relative flex flex-col gap-[32px] w-[1100px]">
          <i className="absolute left-[25px] top-[24px] text-text_secondary">
            <TfiLink className="w-[25px] h-[28px]" />
          </i>
          <input
            style={{
              borderColor:
                "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
            }}
            className="shadow-custom border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[21px] pr-[25.19px] pl-[70px] text-text_secondary"
            type="text"
            placeholder="Enter the link to shorten here"
            value={url}
            onChange={(e)=>setUrl(e.target.value)} disabled={loading}
          />
        </div>
        <div className="relative flex flex-col gap-[32px] w-[1100px]">
          <i className="absolute left-[25px] top-[24px] text-text_secondary">
            <TfiLink className="w-[25px] h-[28px]" />
          </i>
          <input
            style={{
              borderColor:
                "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
            }}
            className="shadow-custom border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[24px] pr-[25.19px] pl-[70px] text-text_secondary"
            type="text"
            placeholder="Enter custom slug"
            value={slug}
            onChange={(e)=>setSlug(e.target.value)} disabled={loading}
          />

          <button onClick={handleAutoGenerate}
          disabled={loading}
            style={{
              width: "183px",
              filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
            }}
            type="button"
            className="absolute right-2 top-[5.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white rounded-[48px] py-[21px] pr-[25.05px] pl-[25px]"
          >
            Auto Generate
          </button>
        </div>

        <Button  type="submit" text="Shorten Now!" width="268px"/>
      </form> */}
    </>
  );
};
export default Add;
