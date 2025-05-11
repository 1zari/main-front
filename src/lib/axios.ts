import { TokenRefreshRequestDto, TokenRefreshResponseDto } from "@/types/api/auth";
import { AuthHelpers } from "@/utils/authHelpers";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // 쿠키 전송은 secure 클라이언트에서만 true 처리
};

// axios 인스턴스 생성 함수
export function createHttpClient(authHelpers?: AuthHelpers): AxiosInstance {
  const instance = axios.create(defaultConfig);

  if (authHelpers) {
    // 요청 인터셉터 토큰 주입 & 디버그 로그
    instance.interceptors.request.use((config) => {
      const { accessToken } = authHelpers.getTokens();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`; // 헤더에 액세스 토큰 추가
      }

      // 디버그용 최종 request config 확인
      console.log("axios request config:", {
        url: `${config.baseURL}${config.url}`,
        method: config.method,
        headers: config.headers,
        data:
          config.data instanceof FormData
            ? Array.from((config.data as FormData).entries())
            : config.data,
      });

      return config;
    });

    // 응답 인터셉터 401 처리 및 토큰 갱신
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const { refreshToken } = authHelpers.getTokens();

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            // 리프레시 토큰으로 새로운 액세스 토큰 요청
            const requestData: TokenRefreshRequestDto = {
              refresh_token: refreshToken,
            };
            const res = await axios.post<TokenRefreshResponseDto>(
              `${API_URL}/user/token/refresh`,
              requestData,
            );

            const newAccessToken = res.data.access_token;
            authHelpers.setTokens(newAccessToken, refreshToken);

            // 갱신된 토큰으로 헤더 업데이트 후 재요청
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch {
            // 갱신 실패 시 로그아웃 처리
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

// 기본 HTTP 클라이언트 (인증 로직 없이 사용)
export const httpClient = createHttpClient();
