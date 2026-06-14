import { create } from "zustand";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  clear: () => void;
}

export const useAuthStore =
  create<AuthStore>()((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) =>
      set({
        user,
        isAuthenticated: !!user,
      }),

    clear: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),
  }));