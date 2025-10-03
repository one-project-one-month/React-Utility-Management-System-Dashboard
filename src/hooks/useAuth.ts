import { login } from "@/services/authApi";
import type { LoginResponse, TLoginSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { setAccessToken, setUser } from "@/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import useCookie from "react-use-cookie";
import { addToast } from "@heroui/react";
import { useNavigate } from "react-router";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, setStoreAccessToken] = useCookie("token");
  const [, setStoreUserToken] = useCookie("user");

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    TLoginSchema
  >({
    mutationFn: (formData: TLoginSchema) => login(formData),
    onSuccess: (data) => {
      dispatch(setAccessToken(data.content.accessToken));
      dispatch(setUser(data.content.user));
      setStoreAccessToken(data.content.accessToken);
      setStoreUserToken(JSON.stringify(data.content.user));
      addToast({
        title: data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        radius: "sm",
      });
      navigate("/");
    },

    onError: (error) => {
      addToast({
        title: error.response?.data.message || "Something went wrong",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        radius: "sm",
        variant:"flat"
      });
    },
  });
};

export default useAuth;
