"use client";
import Button from "../button/Button";
import InputField from "../input/Input";
import useRegisterForm from "./useRegisterForm";

function RegisterForm() {
  const { loading, register, REGISTER_INPUT_FIELDS } = useRegisterForm();

  return (
    <form
      onSubmit={register}
      className="flex flex-col gap-[32px] items-center justify-center"
    >
      <div className="flex flex-col md:gap-[32px] gap-[22px] md:w-[659px] sm:w-[559px] xs:w-[350px] w-[260px]">
        {REGISTER_INPUT_FIELDS.map((field, index) => (
          <InputField
            key={index}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            disabled={field.disabled}
          />
        ))}
      </div>
      <div>
        <Button
          type="submit"
          text="Register"
          paddingRight="101.52px"
          paddingLeft="101.48px"
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default RegisterForm;
