import { login } from "@/services/authApi";
import type { LoginResponse, TLoginSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { setAccessToken, setUser } from "@/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { addToast } from "@heroui/react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const useAuth = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return useMutation<LoginResponse, AxiosError<{ message: string }>, TLoginSchema>({
      mutationFn: (formData: TLoginSchema) => login(formData),
      onSuccess: data => {
         dispatch(setAccessToken(data.content.accessToken));
         dispatch(setUser(data.content.user));
         Cookies.set("ums_token", data.content.accessToken, { expires: 7 });
         Cookies.set("ums_user", JSON.stringify(data.content.user), { expires: 7 });
         addToast({
            title: data.message || "Successfully Logged In",
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
         navigate("/");
      },

      onError: error => {
         addToast({
            title: error.message || "Something went wrong",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

export default useAuth;
