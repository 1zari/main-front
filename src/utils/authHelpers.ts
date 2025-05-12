import { useAuthStore } from "@/store/useAuthStore";
import { getSession } from "next-auth/react";

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthHelpers {
  getTokens: () => AuthTokens;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  redirectToLogin: () => void;
  getAccessToken: () => Promise<string | null>;
  getUserRole: () => Promise<string | null>;
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

  getAccessToken: async () => {
    const session = await getSession();
    return session?.accessToken ?? null;
  },

  getUserRole: async () => {
    const session = await getSession();
    return session?.user?.join_type ?? null;
  },
};
