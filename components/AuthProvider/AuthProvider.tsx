"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {

        await checkSession();

        const user = await getMe();
        setUser(user);
      } catch (e) {
        logout();
      }
    };

    initAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}