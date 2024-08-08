"use client"
import { FORM_STATE } from "@/types/types";
import Button from "../button/Button";
import InputField from "../input/Input";
import useChange from "./useChangePassForm";

const ChangePassForm = () => {
  const { loading, change, formState, handleInputChange, INPUT_FIELDS } = useChange();

  return (
    <form
      onSubmit={change}
      className="flex flex-col gap-[32px] items-center justify-center"
      action=""
    >
      <div className="flex flex-col gap-[32px] md:w-[659px] sm:w-[559px] xs:w-[359px]">
        {INPUT_FIELDS.map((field) => (
          <InputField
            key={field?.id}
            type={field?.type}
            placeholder={field?.placeholder}
            value={formState[field?.id as keyof FORM_STATE]}
            onChange={handleInputChange}
            name={field?.id}
            disabled={loading}
          />
        ))}
      </div>

      <Button
        text="Change Password"
        disabled={loading}
        paddingLeft="50px"
        paddingRight="50px"
      />
    </form>
  );
};

export default ChangePassForm;
