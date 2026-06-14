"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as logoutApi } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const { isAuthenticated, clear } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi(); // API logout
    } finally {
      clear(); // clear store
      router.push("/sign-in");
    }
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link href="/profile">Profile</Link>
          <Link href="/notes">Notes</Link>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </>
      )}
    </nav>
  );
}