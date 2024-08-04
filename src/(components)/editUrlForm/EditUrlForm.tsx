"use client";
import Button from "../button/Button";
import { URL_TYPE } from "@/types/types";
import { DOMAIN } from "@/constants/constants";
import { TfiLink } from "react-icons/tfi";
import useEditUrlForm from "./useEditUrlForm";

const EditUrlForm = ({ urlCode }: URL_TYPE) => {
  const { editablePart, setEditablePart, handleEdit, loading } = useEditUrlForm(
    urlCode!
  );
  return (
    <form
      onSubmit={handleEdit}
      className="flex flex-col gap-[32px] items-center justify-center lg:mt-[352px] mt-[200px] lg:mb-[435px] mb-[200px] mx-[26px] md:mx-0"
      action=""
    >
      <span className="flex xs:hidden sm:hidden text-text_secondary">
        Edit Slug:
      </span>

      <div className="relative flex flex-col gap-[32px] xl:w-[1100px] lg:w-[900px] md:w-[700px] sm:w-[600px] xs:w-[400px] w-[282px]">
        <i className="absolute left-[25px] top-[24px] text-text_secondary">
          <TfiLink className="w-[25px] h-[28px]" />
        </i>

        <div className="flex items-center shadow-custom border-4 bg-input_bg_clr border-input_border_clr text-nowrap rounded-[48px] py-[21px] pr-[25.19px] pl-[70px] text-text_secondary">
          <span className="hidden xs:flex sm:flex text-nowrap text-text_secondary">
            {DOMAIN}
          </span>
          <input
            value={editablePart}
            onChange={(e) => setEditablePart(e.target.value)}
            style={{
              borderColor:
                "linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)",
            }}
            className="w-full bg-transparent text-text_secondary focus:outline-none"
            type="text"
          />
        </div>
      </div>

      <Button
        type="submit"
        text="Edit Url"
        paddingLeft="90px"
        paddingRight="90px"
        disabled={loading}
      />
    </form>
  );
};
export default EditUrlForm;
