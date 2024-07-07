import Button from "@/(components)/button/Button";
import InputField from "@/(components)/input/Input";
import LoginForm from "@/(components)/loginForm/loginForm";
import Logo from "@/(components)/logo/Logo";
import Link from "next/link";

function LogIn() {
  return (
    <>
      <header className="mt-[40px]">
        <Logo />
      </header>
      <div className="flex flex-col items-center justify-center mb-[262px] mt-[216px]">
        <div className="mb-[46px] flex flex-col items-center justify-center">
          <p className="font-extrabold text-[60px] leading-[80.01px] animate-text bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#A353AA] bg-clip-text text-transparent">
            Shorten Your Loooong Links &#58;&#41;
          </p>
          <div className="w-[634px]">
            <p className="text-text_secondary text-center text-[16px] leading-[23.5px]">
              Linkly is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </p>
          </div>
        </div>
        <LoginForm/>
      </div>
      <footer className="mb-[30px]">
        <div className="flex items-center justify-center text-text_secondary">
          {" "}
          <Link
            className="text-brand_primary_blue underline"
            href={"/register"}
          >
            Register
          </Link>{" "}
          &nbsp; if not already registered
        </div>
      </footer>
    </>
  );
}
export default LogIn;
