import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../store/slices/authSlice";
import { tokenManager } from "../utils/auth";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = tokenManager.getAccessToken();
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
};

export default useAuthInit;
