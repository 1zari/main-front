import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSession, signIn, signOut } from "next-auth/react";
import type { UserBase } from "@/types/commonUser";
import type { JoinType } from "@/types/commonUser";

interface AuthState {
  user: UserBase | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  isUserLoggedIn: boolean;
  error: string | null;

  setAuth: (user: UserBase | null) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  initialize: () => Promise<void>;
  loginWithCredentials: (email: string, password: string, joinType: JoinType) => Promise<boolean>;
  loginWithSocial: (provider: "kakao" | "naver") => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isInitialized: false,
      isUserLoggedIn: false,
      error: null,

      setAuth: (user) => {
        console.log("[AuthStore] 인증 정보 설정", {
          user: user ? `${user?.name} (${user?.join_type})` : "none",
        });

        set({
          user,
          isAuthenticated: !!user,
          isUserLoggedIn: !!user,
          error: null,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isUserLoggedIn: false,
          error: null,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      initialize: async () => {
        console.log("[useAuthStore] initialize 시작");
        const { setAuth, setError, clearAuth } = get();
        try {
          set({ isLoading: true, isInitialized: false });

          // 세션 가져오기 시도
          const session = await getSession();

          // 세션 유효성 확인 - user 정보만 있어도 로그인 처리
          if (session?.user && session.user.id) {
            // 사용자 정보 구성
            const user: UserBase = {
              id: session.user.id,
              email: session.user.email ?? "",
              name: session.user.name ?? "",
              join_type: session.user.join_type,
              user_id: session.user.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            setAuth(user);
          } else {
            clearAuth();
          }
          console.log("[useAuthStore] initialize 세션 결과", session);
        } catch (error) {
          setError(error instanceof Error ? error.message : "인증 초기화 실패");
          clearAuth();
        } finally {
          // 상태 동기화를 위해 현재 상태 가져오기
          const currentState = get();

          set({
            isLoading: false,
            isInitialized: true,
            // 사용자 객체만 있어도 로그인 상태로 간주
            isUserLoggedIn: !!currentState.user,
          });
          console.log("[useAuthStore] initialize 끝", {
            user: get().user,
            isAuthenticated: get().isAuthenticated,
            isUserLoggedIn: get().isUserLoggedIn,
          });
        }
      },

      loginWithCredentials: async (email, password, joinType) => {
        console.log("[useAuthStore] loginWithCredentials 시작", { email, joinType });
        const { setLoading, setError, initialize } = get();

        try {
          setLoading(true);
          setError(null);

          const result = await signIn(
            joinType === "company" ? "company-credentials" : "user-credentials",
            {
              email,
              password,
              join_type: joinType,
              redirect: false,
            },
          );

          if (result?.error) {
            console.error("[AuthStore] 로그인 실패:", result.error);
            setError(result.error);
            return false;
          }

          await initialize();
          console.log("[useAuthStore] loginWithCredentials 끝", {
            user: get().user,
            isAuthenticated: get().isAuthenticated,
            isUserLoggedIn: get().isUserLoggedIn,
            error: get().error,
          });
          return true;
        } catch (error) {
          setError(error instanceof Error ? error.message : "로그인 실패");
          console.error("[useAuthStore] loginWithCredentials error", error);
          return false;
        } finally {
          setLoading(false);
        }
      },

      loginWithSocial: async (provider) => {
        console.log("[useAuthStore] loginWithSocial 시작", { provider });
        const { setLoading } = get();

        try {
          setLoading(true);
          await signIn(provider, { callbackUrl: "/" });
          console.log("[useAuthStore] loginWithSocial 끝");
        } catch (error) {
          console.error(`[AuthStore] ${provider} 로그인 오류:`, error);
          setLoading(false);
        }
      },

      logout: async () => {
        console.log("[useAuthStore] logout 시작");
        const { clearAuth, setLoading, setError } = get();

        try {
          setLoading(true);
          await signOut({ redirect: false });
          clearAuth();
          console.log("[useAuthStore] logout 끝", {
            user: get().user,
            isAuthenticated: get().isAuthenticated,
            isUserLoggedIn: get().isUserLoggedIn,
          });
        } catch (error) {
          console.error("[AuthStore] 로그아웃 오류:", error);
          setError(error instanceof Error ? error.message : "로그아웃 실패");
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isUserLoggedIn: state.isUserLoggedIn,
      }),
    },
  ),
);
