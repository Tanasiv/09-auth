"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/app/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { user, isAuthenticated, clear } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clear();
    router.push("/sign-in");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li><a href="/profile">Profile</a></li>
          <li>{user?.email}</li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </>
      ) : (
        <>
          <li><a href="/sign-in">Login</a></li>
          <li><a href="/sign-up">Sign up</a></li>
        </>
      )}
    </>
  );
}