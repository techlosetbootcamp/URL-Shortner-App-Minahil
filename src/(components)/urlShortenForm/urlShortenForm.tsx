"use client";
import { TfiLink } from "react-icons/tfi";
import useUrlShortenForm from "./useUrlShortenForm";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

const UrlShortenForm = () => {
  const { url, setUrl, loading, shorten,setAutoPaste } = useUrlShortenForm();

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={shorten}
        className="relative flex flex-col gap-[32px] w-[659px] lg:w-[659px] 2xl:w-[1100px]"
      >
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
          placeholder="Enter the link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />

        <button
          style={{
            width: "183px",
            filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
          }}
          type="submit"
          className="absolute right-2 top-[5.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white rounded-[48px] py-[21px] pr-[25.05px] pl-[25px]"
        >
          Shorten Now!
        </button>
      </form>

      <div className="flex items-center justify-center gap-[15px] text-text_secondary mb-[38px] mt-[19px]">
        <ToggleSwitch onChange={setAutoPaste} />
        <div>Auto paste from clipboard</div>
      </div>
    </div>
  );
};
export default UrlShortenForm;
