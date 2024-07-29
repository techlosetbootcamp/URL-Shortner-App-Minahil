import { useAppSelector, useAppDispatch } from "./index";
import { getUser } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useFetchUser = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUser());
      } catch (error) {
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [dispatch]);

  return { user, isLoading, isError };
};
export default useFetchUser;
