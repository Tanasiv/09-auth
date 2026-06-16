"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as logoutApi } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const { isAuthenticated, clear, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutApi();
    clear();
    router.push("/sign-in");
  };

  if (isAuthenticated) {
    return (
      <>
        <li>{user?.email}</li>

        <li>
          <Link href="/profile">Profile</Link>
        </li>

        <li>
          <Link href="/notes">Notes</Link>
        </li>

        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/sign-in">Sign in</Link>
      </li>

      <li>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
}