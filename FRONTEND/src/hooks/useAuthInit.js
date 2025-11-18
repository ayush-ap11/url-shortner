import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../store/slices/authSlice";
import { userManager } from "../utils/auth";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user exists in localStorage (cookie-based auth)
    const user = userManager.getUser();
    if (user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
};

export default useAuthInit;
