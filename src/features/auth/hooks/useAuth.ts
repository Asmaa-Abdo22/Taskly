import toast from "react-hot-toast";
import { sendResetLink } from "../api/forgotPassword";
import { RESET_PASSWORD_SUCCESS_MESSAGE } from "../constants/auth.constants";

export const useAuth = () => {
  const forgotPassword = async (email: string) => {
    try {
      await sendResetLink(email);

      toast.success(RESET_PASSWORD_SUCCESS_MESSAGE);

      return true;
    } catch {
      toast.error("Failed to send reset link");
      return false;
    }
  };

  return {
    forgotPassword,
  };
};