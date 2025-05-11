import { TokenRefreshRequestDto, TokenRefreshResponseDto } from "@/types/api/auth";
import { tokenService } from "@/utils/tokenService";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 로그인 페이지로 리디렉션
function redirectToLogin(): void {
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}

const defaultConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // 쿠키 전송은 secure 클라이언트에서만 true 처리
};

// axios 인스턴스 생성 함수 (secure 옵션으로 단순화)
export function createHttpClient(secure: boolean = false): AxiosInstance {
  const instance = axios.create(defaultConfig);

  if (secure) {
    // 요청 인터셉터 토큰 주입
    instance.interceptors.request.use(async (config) => {
      const accessToken = await tokenService.getAccessToken();

      console.log(`🔐 secure 요청 [${config.method?.toUpperCase()} ${config.url}]`);

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log(`- 토큰 추가됨`);
      } else {
        console.log(`- 토큰 없음`);
      }

      return config;
    });

    // 응답 인터셉터 401 처리 및 토큰 갱신
    instance.interceptors.response.use(
      (response) => {
        console.log(
          `✅ 응답 성공 [${response.config.method?.toUpperCase()} ${response.config.url}]`,
        );
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = tokenService.getRefreshToken();

        console.log(
          `❌ 응답 오류 [${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}]`,
        );
        console.log(`- 상태 코드: ${error.response?.status || "알 수 없음"}`);

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            // 리프레시 토큰으로 새로운 액세스 토큰 요청
            const requestData: TokenRefreshRequestDto = {
              refresh_token: refreshToken,
            };

            console.log("🔄 토큰 갱신 시도");

            const res = await axios.post<TokenRefreshResponseDto>(
              `${API_URL}/user/token/refresh`,
              requestData,
            );

            const newAccessToken = res.data.access_token;
            tokenService.setTokens(newAccessToken, refreshToken);

            console.log("✅ 토큰 갱신 성공");

            // 갱신된 토큰으로 헤더 업데이트 후 재요청
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (err) {
            console.log("❌ 토큰 갱신 실패");
            console.log("err", err);
            // 갱신 실패 시 로그아웃 처리
            tokenService.clearTokens();
            redirectToLogin();
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

// 보안 HTTP 클라이언트 (인증 로직 포함)
export const secureClient = createHttpClient(true);
