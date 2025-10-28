import { logout, setAccessToken } from "@/store/features/auth/authSlice";
import { store } from "@/store/store";
import type { RefreshTokenResponse } from "@/types/auth";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      console.log("access token:", accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If refresh token request fails → logout immediately
    if (error.config?.url?.includes("auth/refresh-token")) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const res =
          await axiosInstance.post<RefreshTokenResponse>("auth/refresh-token");

        const newAccessToken = res.data.content.accessToken;

        if (!newAccessToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        store.dispatch(setAccessToken(newAccessToken));
        Cookies.set("token", newAccessToken, { expires: 7 });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance.request(error.config);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
