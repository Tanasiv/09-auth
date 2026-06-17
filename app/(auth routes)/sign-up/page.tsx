"use client";
import styles from "./SignUpPage.module.css";

import { register, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await register({ email, password });

    const user = await getMe();
    setUser(user);

    router.push("/profile");
  };

  return (
    <main className={styles.mainContent}>
  <form className={styles.form} onSubmit={onSubmit}>
    <h1 className={styles.formTitle}>Sign Up</h1>

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
        Register
      </button>
    </div>
  </form>
</main>
  );
}