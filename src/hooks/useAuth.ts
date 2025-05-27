import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { TRootState } from "../store/store";

export const useAuth = () => {
  const navigate = useNavigate();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const getToken = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    return token;
  };

  const requireAuth = (message = "Please login to continue") => {
    const token = getToken();
    if (!token) {
      toast.error(message);
      navigate("/login");
      return false;
    }
    return true;
  };

  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { "x-auth-token": token } : null;
  };

  return {
    user,
    isAuthenticated: !!getToken(),
    getToken,
    requireAuth,
    getAuthHeaders,
  };
};
