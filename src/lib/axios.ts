import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthHelpers } from "@/utils/authHelpers";
import { TokenRefreshRequestDto, TokenRefreshResponseDto } from "@/types/api/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("Using API URL:", API_URL);

const defaultConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
};

// axios 인스턴스 생성 함수
export function createHttpClient(authHelpers?: AuthHelpers): AxiosInstance {
  const instance = axios.create(defaultConfig);

  // 요청 인터셉터 - 디버깅
  instance.interceptors.request.use(
    (config) => {
      console.log("Making request:", {
        method: config.method,
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
        headers: config.headers,
      });
      return config;
    },
    (error) => {
      console.error("Request error:", {
        message: error.message,
        config: error.config
          ? {
              method: error.config.method,
              url: error.config.url,
              baseURL: error.config.baseURL,
              data: error.config.data,
              headers: error.config.headers,
            }
          : undefined,
      });
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터 - 디버깅
  instance.interceptors.response.use(
    (response) => {
      console.log("Response received:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
        config: {
          method: response.config.method,
          url: response.config.url,
          baseURL: response.config.baseURL,
        },
      });
      return response;
    },
    (error) => {
      console.error("Response error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config
          ? {
              method: error.config.method,
              url: error.config.url,
              baseURL: error.config.baseURL,
              data: error.config.data,
              headers: error.config.headers,
            }
          : undefined,
      });
      return Promise.reject(error);
    },
  );

  // authHelpers가 제공되면 인증 기능 활성화
  if (authHelpers) {
    // 요청 인터셉터 - accessToken 주입
    instance.interceptors.request.use((config) => {
      const { accessToken } = authHelpers.getTokens();
      if (accessToken && config.headers) {
        // 토큰이 있고 헤더가 있으면 헤더에 토큰 주입
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // 응답 인터셉터 - 401 처리 및 토큰 갱신
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const { refreshToken } = authHelpers.getTokens();

        // 401 에러 + 재시도되지 않은 요청 + 리프레시 토큰 존재
        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;

          try {
            // 토큰 갱신 요청
            const requestData: TokenRefreshRequestDto = { refresh_token: refreshToken };
            const res = await axios.post<TokenRefreshResponseDto>(
              `${API_URL}/user/token/refresh`,
              requestData,
            );

            const newAccessToken = res.data.access_token;
            authHelpers.setTokens(newAccessToken, refreshToken);

            // 헤더 업데이트 후 요청 재시도
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch {
            // 토큰 갱신 실패 시 로그아웃 처리
            authHelpers.clearTokens();
            authHelpers.redirectToLogin();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
}

// 기본 HTTP 클라이언트 (인증 없음)
export const httpClient = createHttpClient();
