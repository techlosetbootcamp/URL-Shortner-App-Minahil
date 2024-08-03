"use client";
import useChange from "@/(components)/changePassForm/useChangePassForm";
import Button from "../button/Button";
import InputField from "../input/Input";

const ChangePassForm = () => {
  const { loading, change, INPUT_FIELDS } = useChange();
  return (
    <form
      onSubmit={change}
      className="flex flex-col gap-[32px] items-center justify-center"
      action=""
    >
      <div className="flex flex-col gap-[32px] md:w-[659px] sm:w-[559px] xs:w-[359px]">
        {INPUT_FIELDS.map((field, index) => (
          <InputField
            key={index}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
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
