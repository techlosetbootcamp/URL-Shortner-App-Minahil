"use client";
import useEditProfileForm from "@/(components)/editProfileForm/useEditProfileForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Link from "next/link";
import Loader from "../loader/Loader";

const EditProfileForm = () => {
  const {
    user,
    isLoading,
    name,
    setName,
    newEmail,
    setEmail,
    handleSaveChanges,
  } = useEditProfileForm();
  if (isLoading) return <Loader />;
  return (
    <form
      onSubmit={handleSaveChanges}
      className="flex gap-7 flex-col items-center justify-center text-text_secondary w-full "
    >
      <div className="flex gap-10 items-center justify-between">
        <div>Name: </div>

        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-10 items-center justify-between">
        <div>Email: </div>
        <InputField
          type="text"
          value={newEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        text="Save Changes"
        paddingRight="50px"
        paddingLeft="50px"
      />
    </form>
  );
};
export default EditProfileForm;
