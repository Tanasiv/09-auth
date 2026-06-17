
"use client";
import styles from "./SignInPage.module.css";

import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { User } from "@/types";


export default function SignInPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user: User = await login({ email, password });

      setUser(user);
      router.push("/profile");
    } catch {
      setError("Login failed");
    }
  };

  return (
  <main className={styles.mainContent}>
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.formTitle}>Sign In</h1>

      <label className={styles.formGroup}>
        Email
        <input
          className={styles.input}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.formGroup}>
        Password
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submitButton} type="submit">
          Login
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  </main>
);
}