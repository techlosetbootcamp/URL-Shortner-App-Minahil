"use client";
import useResetPassForm from "@/(components)/resetPassForm/useResetPassForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Loader from "../loader/Loader";

type tokenProps = {
  token: string;
};
const ResetPassForm = ({ token }: tokenProps) => {
  const { loading, reset, verified, RESET_INPUT_FIELDS } =
    useResetPassForm(token);
  if (!verified || loading) return <Loader />;
  return (
    <form
      onSubmit={reset}
      className="flex flex-col gap-[32px] items-center justify-center"
      action=""
    >
      <div className="flex flex-col gap-[32px] md:w-[659px] sm:w-[559px] xs:w-[359px]">
        {RESET_INPUT_FIELDS.map((field, index) => (
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

      <Button
        text="Set Password"
        disabled={loading}
        paddingRight="100px"
        paddingLeft="100px"
      />
    </form>
  );
};
export default ResetPassForm;
