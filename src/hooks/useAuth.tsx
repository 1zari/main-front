import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import type { JoinType } from "@/types/commonUser";

/**
 * 인증 기능을 제공하는 훅
 * Zustand 스토어를 직접 사용하고, 필요한 상태 처리와 유즈케이스를 구현합니다.
 */
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

  // 인증 초기화 - 앱 시작 시 한 번만 실행
  useEffect(() => {
    // 이미 초기화 됐거나 진행 중이면 무시
    if (isInitialized || isLoading) {
      return;
    }

    const initAuth = async () => {
      try {
        await initialize();
      } catch (error) {
        console.error("[useAuth] 인증 초기화 실패", error);
      }
    };
    initAuth();
  }, [initialize, isInitialized, isLoading]);

  // 로그인 핸들러
  const login = useCallback(
    async (email: string, password: string, joinType: JoinType) => {
      const success = await loginWithCredentials(email, password, joinType);
      router.push("/");

      return success;
    },
    [loginWithCredentials, router],
  );

  // 로그아웃 핸들러
  const logout = useCallback(async () => {
    await storeLogout();
    router.push("/auth/login");
  }, [storeLogout, router]);

  // 소셜 로그인 핸들러
  const socialLogin = useCallback(
    (provider: "kakao" | "naver") => {
      loginWithSocial(provider);
    },
    [loginWithSocial],
  );

  // 역할 확인 유틸리티
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

  // 컴포넌트에서 필요한 상태와 메서드 반환
  return {
    // 상태
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    isInitialized,
    isUserLoggedIn,
    error,

    // 컴포넌트에서 사용할 편의 상태
    isInitializing: !isInitialized,

    // 액션
    login,
    logout,
    socialLogin,
    hasRole,
  };
};
