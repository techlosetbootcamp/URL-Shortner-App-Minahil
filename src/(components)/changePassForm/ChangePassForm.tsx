"use client"
import useChange from "@/(components)/changePassForm/useChangePassForm";
import Button from "../button/Button";
import InputField from "../input/Input";

const ChangePassForm = () => {
  const {
    loading,
    error,
    password,
    setNewPassword,
    oldpassword,
    setOldPassword,
    change,
  } = useChange();
  return (
    <form
      onSubmit={change}
      className="flex flex-col gap-[32px] items-center justify-center"
      action=""
    >
      <div className="flex flex-col gap-[32px] w-[659px]">
        <InputField
          type="password"
          placeholder="Old Password"
          value={oldpassword}
          onChange={(e) => setOldPassword(e.target.value)}
          disabled={loading}
        />
        <InputField
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
        <InputField type="password" placeholder="Confirm Password" />
      </div>

      <Button text="Change Password" disabled={loading} />
    </form>
  );
};
export default ChangePassForm;
