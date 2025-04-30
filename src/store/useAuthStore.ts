import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserBase } from "@/types/commonUser";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserBase | null;
  setAuth: (accessToken: string, refreshToken: string, user: UserBase) => void;
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
