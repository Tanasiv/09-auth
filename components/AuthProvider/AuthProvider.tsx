import { useEffect } from "react";
import { getMe } from "@/lib/api/clientApi"; 
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, [setUser]);

  return children;
}