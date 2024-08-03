import { BUTTON_TYPE } from "@/types/types";

const Button = ({
  text,
  onClick,
  type,
  disabled,
  paddingRight,
  paddingLeft,
}: BUTTON_TYPE) => {
  return (
    <button
      typeof={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        paddingRight: paddingRight,
        paddingLeft: paddingLeft,
        height: "60px",
        filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",
      }}
      type="submit"
      className="bg-brand_primary_blue text-nowrap text-[16px] border flex items-center justify-center border-brand_primary_blue font-semibold text-white rounded-[48px]"
    >
      {text}
    </button>
  );
};
export default Button;
