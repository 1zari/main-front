import axios from "axios";
import { IS_PRODUCTION } from "@/constants/env";
import { useAuthStore } from "@/store/useAuthStore";

const baseURL = IS_PRODUCTION ? "https://api.production.com" : "https://api.staging.com";

export const authAxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 - accessToken 자동 주입
authAxiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 - 401이면 refresh 시도
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${baseURL}/members/token/refresh/`, {
          refresh: refreshToken,
        });
        const newAccessToken = res.data.access;
        const { user } = useAuthStore.getState();
        setAuth(newAccessToken, refreshToken, user!);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAxiosInstance(originalRequest);
      } catch {
        clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
