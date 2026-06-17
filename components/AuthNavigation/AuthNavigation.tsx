"use client";
import styles from "./AuthNavigation.module.css";

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
      <li className={styles.userEmail}>{user?.email}</li>

      <li className={styles.navigationItem}>
        <Link className={styles.navigationLink} href="/profile">
          Profile
        </Link>
      </li>

      <li className={styles.navigationItem}>
        <Link className={styles.navigationLink} href="/notes">
          Notes
        </Link>
      </li>

      <li className={styles.navigationItem}>
        <button
          className={styles.logoutButton}
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </>
  );
}
  return (
  <>
    <li className={styles.navigationItem}>
      <Link className={styles.navigationLink} href="/sign-in">
        Sign in
      </Link>
    </li>

    <li className={styles.navigationItem}>
      <Link className={styles.navigationLink} href="/sign-up">
        Sign up
      </Link>
    </li>
  </>
);
}