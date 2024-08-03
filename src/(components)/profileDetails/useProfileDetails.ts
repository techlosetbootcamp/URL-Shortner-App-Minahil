"use client";
import useFetchUser from "@/hooks/useFetchUser";
const useProfileDetails = () => {
  const { user, isLoading, isError } = useFetchUser();
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
  };
  return { getInitials, user, isLoading, isError };
};
export default useProfileDetails;
