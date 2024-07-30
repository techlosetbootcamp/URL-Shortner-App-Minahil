"use client";
import useFetchUser from "@/hooks/useFetchUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropdownButton = () => {
  const { user, isLoading, isError }=useFetchUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  if(isLoading) return <div className="text-white" >Loading....</div>

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          <div className="text-white flex gap-[10px] items-center">
            <div className="flex flex-col text-left">
              <div className="flex text-[10px]">Welcome</div>
              <div className="flex text-[16px] font-semibold">{user?.name}</div>
            </div>
            <div>
              <IoIosArrowDown className="text-text_secondary h-[28px] w-[20px]" />
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            style={{ borderRadius: "10px", padding: "10px" }}
            className="py-10 flex justify-center flex-col gap-10 items-center text-left  text-white"
            role="none"
          >
            <button
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))",

                marginBottom: "4px",
              }}
              className="flex items-center justify-center rounded-lg w-[100px] text-sm border-b-2 bg-brand_primary_blue"
              role="menuitem"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Profile
            </button>

            <button
              style={{
                filter: "drop-shadow(10px 9px 10px rgba(220, 38, 38, 0.38))",
              }}
              className="items-center justify-center w-[100px] rounded-lg flex text-sm bg-red-600"
              role="menuitem"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/`,
                })
              }
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DropdownButton;
