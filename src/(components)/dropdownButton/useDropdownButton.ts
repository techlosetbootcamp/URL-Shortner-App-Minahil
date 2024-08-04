import useFetchUser from "@/hooks/useFetchUser";
import { useState } from "react";
import useProfileDetails from "../profileDetails/useProfileDetails";

const useDropdownButton = () => {
  const { user, isLoading } = useFetchUser();
  const { getInitials } = useProfileDetails();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return { user, isLoading, toggleDropdown, isOpen,getInitials };
};
export default useDropdownButton;
