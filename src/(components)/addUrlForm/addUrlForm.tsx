"use client";
import { TfiLink } from "react-icons/tfi";
import Button from "../button/Button";
import useAddUrlForm from "./useAddUrlForm";
import { FaArrowRight } from "react-icons/fa6";

const AddUrlForm = () => {
  const { url, setUrl, slug, setSlug, loading, handleAutoGenerate, shorten } =
    useAddUrlForm();
  return (
    <form
      onSubmit={shorten}
      className="flex flex-col gap-[32px] items-center justify-center lg:mt-[352px] mt-[200px] lg:mb-[442px] mb-[200px] mx-[26px] md:mx-0"
    >
      <div className="relative flex flex-col gap-[32px] xl:w-[1100px] lg:w-[900px] md:w-[700px] sm:w-[600px] xs:w-[400px] w-[282px]">
        <i className="absolute left-[25px] top-[24px] text-text_secondary">
          <TfiLink className="w-[25px] h-[28px]" />
        </i>
        <input
          style={{
            borderColor:
              "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
          }}
          className="shadow-custom border-4 xs:text-[16px] sm:text-[16px] text-[13px] bg-input_bg_clr border-input_border_clr rounded-[48px] py-[21px] pr-[25.19px] pl-[70px] text-text_secondary"
          type="text"
          placeholder="Enter the link to shorten here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="relative flex flex-col gap-[32px] xl:w-[1100px] lg:w-[900px] md:w-[700px] sm:w-[600px] xs:w-[400px] w-[282px]">
        <i className="absolute left-[25px] top-[24px] text-text_secondary">
          <TfiLink className="w-[25px] h-[28px]" />
        </i>
        <input
          style={{
            borderColor:
              "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
          }}
          className="shadow-custom xs:text-[16px] sm:text-[16px] text-[13px] border-4 bg-input_bg_clr border-input_border_clr rounded-[48px] py-[24px] pr-[25.19px] pl-[70px] text-text_secondary"
          type="text"
          placeholder="Enter custom slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleAutoGenerate}
          disabled={loading}
          style={{
            filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
          }}
          type="button"
          className="absolute hidden xs:block sm:block md:w-[183px] w-[150px] md:text-[16px] text-[12px] right-2 md:top-[5.5px] top-[9.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white rounded-[48px] py-[21px] pr-[25.05px] pl-[25px] "
        >
          Auto Generate
        </button>

        <button
          onClick={handleAutoGenerate}
          disabled={loading}
          style={{
            width: "55px",
            height: "55px",
            filter: "drop-shadow(10px 9px 5px rgba(20, 78, 227, 0.38)",
          }}
          type="button"
          className="flex xs:hidden sm:hidden rounded-[48px] items-center justify-center absolute right-2 top-[9.5px] font-semibold bg-brand_primary_blue border border-brand_primary_blue text-white py-[13.5px] px-[15.48px]"
        >
          <FaArrowRight />
        </button>
      </div>

      <Button
        type="submit"
        text="Shorten Now!"
        paddingLeft="80.98px"
        paddingRight="81.02px"
      />
    </form>
  );
};
export default AddUrlForm;
