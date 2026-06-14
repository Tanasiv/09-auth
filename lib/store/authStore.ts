import { create } from "zustand";
import type { User } from "@/types/user";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;

  clear: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  clear: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));