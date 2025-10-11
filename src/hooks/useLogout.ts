import { logout } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout as logoutAction } from "@/store/features/auth/authSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(logoutAction());
      navigate("/login");
    },
  });
};
export default useLogout;
