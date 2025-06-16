import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserBase } from "@/types/commonUser";
// 2025.06.08) setAuth user 매개변수를 optional로 변경하여 null 허용
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserBase | null;
  setAuth: (accessToken: string, refreshToken: string, user: UserBase | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setAuth: (accessToken, refreshToken, user) => set({ accessToken, refreshToken, user }),

      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "auth-storage", // localStorage 키
    },
  ),
);
