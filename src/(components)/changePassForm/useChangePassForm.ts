// useChange.ts
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import useFetchUser from "@/hooks/useFetchUser";
import { changePassword } from "@/redux/slices/passwordSlice";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { INPUT_FIELDS } from "@/constants/constants";
import { FORM_STATE } from "@/types/types";

const useChange = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FORM_STATE>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { user } = useFetchUser();
  const email = user?.email;
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const change = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const match = await bcrypt.compare(formState.oldPassword, user?.password!);
      if (!match) {
        toast.error("Incorrect Old Password");
        setLoading(false);
        return false;
      }
      if (formState.newPassword !== formState.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return false;
      }
      dispatch(changePassword({ password: formState.newPassword, email }));
      toast.success("Password Changed Successfully!");
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`,
      });
    } catch (err) {
      toast.error("Error try again!");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    change,
    formState,
    handleInputChange,
    INPUT_FIELDS,
  };
};

export default useChange;
