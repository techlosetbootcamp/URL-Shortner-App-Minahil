"use client";
import useEditProfileForm from "@/(components)/editProfileForm/useEditProfileForm";
import InputField from "../input/Input";
import Button from "../button/Button";
import Loader from "../loader/Loader";

const EditProfileForm = () => {
  const { isLoading, handleSaveChanges, loading, EDIT_INPUT_FIELDS } =
    useEditProfileForm();
  if (isLoading) return <Loader />;
  return (
    <form
      onSubmit={handleSaveChanges}
      className="flex gap-7 flex-col items-center justify-center text-text_secondary w-full "
    >
      {EDIT_INPUT_FIELDS.map((field, index) => (
        <div key={index} className="flex gap-10 items-center justify-between">
          <div>{field.label}</div>
          <InputField
            type={field.type}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}

      <Button
        type="submit"
        text="Save Changes"
        paddingRight="50px"
        paddingLeft="50px"
        disabled={loading}
      />
    </form>
  );
};
export default EditProfileForm;
