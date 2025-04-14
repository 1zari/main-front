import { create } from "zustand";
import { LoginResponse } from "./types";

interface LoginState {
  token: string | null;
  user: LoginResponse["user"] | null;
  setLogin: (res: LoginResponse) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  user: null,
  setLogin: (res) => set({ token: res.accessToken, user: res.user }),
}));
