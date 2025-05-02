import { useAuthStore } from "@/store/useAuthStore";

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthHelpers {
  getTokens: () => AuthTokens;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  redirectToLogin: () => void;
}

export const authHelpers: AuthHelpers = {
  getTokens: (): AuthTokens => {
    const { accessToken, refreshToken } = useAuthStore.getState();
    return { accessToken, refreshToken };
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    const { user } = useAuthStore.getState();
    useAuthStore.getState().setAuth(accessToken, refreshToken, user!);
  },

  clearTokens: (): void => {
    useAuthStore.getState().clearAuth();
  },

  redirectToLogin: (): void => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
};
