import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import type { JoinType, UserBase } from "@/types/commonUser";
import type { User, UserProfile } from "@/types/user";

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    isInitialized,
    isUserLoggedIn,
    error,
    initialize,
    loginWithCredentials,
    loginWithSocial,
    logout: storeLogout,
  } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      console.log("[useAuth] 인증 초기화 시작");
      try {
        await initialize();
        console.log("[useAuth] 인증 초기화 완료", {
          isAuthenticated: useAuthStore.getState().isAuthenticated,
          isUserLoggedIn: useAuthStore.getState().isUserLoggedIn,
          user: useAuthStore.getState().user,
        });
      } catch (error) {
        console.error("[useAuth] 인증 초기화 실패", error);
      }
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    console.log("[useAuth] 인증 상태 변경 감지", {
      isAuthenticated,
      isInitialized,
      isUserLoggedIn,
      isLoading,
      isInitializing: !isInitialized,
      user: user ? `${user.name} (${user.email})` : null,
    });
  }, [isAuthenticated, isInitialized, isUserLoggedIn, isLoading, user]);

  const login = useCallback(
    async (email: string, password: string, joinType: JoinType) => {
      console.log("[useAuth] 로그인 시도", { email, joinType });
      const success = await loginWithCredentials(email, password, joinType);
      if (success) {
        console.log("[useAuth] 로그인 성공");
        router.push("/");
      } else {
        console.log("[useAuth] 로그인 실패");
      }
      return success;
    },
    [loginWithCredentials, router],
  );

  const logout = useCallback(async () => {
    console.log("[useAuth] 로그아웃 시도");
    await storeLogout();
    console.log("[useAuth] 로그아웃 완료");
    router.push("/auth/login");
  }, [storeLogout, router]);

  const socialLogin = useCallback(
    (provider: "kakao" | "naver") => {
      console.log("[useAuth] 소셜 로그인 시도", { provider });
      loginWithSocial(provider);
    },
    [loginWithSocial],
  );

  const hasRole = useCallback(
    (role: JoinType | JoinType[]) => {
      if (!isUserLoggedIn || !user) return false;

      if (Array.isArray(role)) {
        return role.includes(user.join_type);
      }

      return user.join_type === role;
    },
    [isUserLoggedIn, user],
  );

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    isInitialized,
    isInitializing: !isInitialized,
    isUserLoggedIn,
    error,
    login,
    logout,
    socialLogin,
    hasRole,
  };
};
