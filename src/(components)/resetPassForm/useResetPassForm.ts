"use client";
import { USER_TYPE } from "@/types/userType";
import { AxiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RESET_INPUT_FIELDS as BASE_INPUT_FIELDS } from "@/constants/constants";

const useReset = (token: string) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<USER_TYPE>();

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await AxiosInstance.post("/password/verifytoken", {
          token: token,
        });
        if (response.status === 409) {
          setError("Invalid Token or has expired");
          setVerified(true);
          toast.error("Invalid Token or has expired");
        }

        if (response.status === 200) {
          setError("");
          setVerified(true);
          const userData = response.data;

          setUser(userData);
        }
      } catch (error) {
        toast.error("Error, try Again");
      }
    };
    verifyToken();
  }, [token]);

  const reset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return false;
    }
    try {
      const response = await AxiosInstance.post("/password/reset", {
        password,
        email: user?.email,
      });

      if (response.status === 400) {
        setError("Something Went wrong, try again");
        toast.error("Something Went wrong, try again");
      }

      if (response.status === 200) {
        toast.success("Password Changed Successfully!");
        router.refresh();
        router.push("/login");
      }
    } catch (err) {
      toast.error("Error try again!");
    } finally {
      setLoading(false);
    }
  };
  const RESET_INPUT_FIELDS = BASE_INPUT_FIELDS.map((field) => ({
    ...field,
    value: field.id === "password" ? password : confirmPassword,
    onChange:
      field.id === "password"
        ? (e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
        : (e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value),
    disabled: loading,
  }));
  return {
    loading,
    reset,
    verified,
    RESET_INPUT_FIELDS,
    error,
  };
};
export default useReset;
