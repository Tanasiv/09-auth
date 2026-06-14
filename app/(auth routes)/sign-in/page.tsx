"use client";

import { login, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      const user = await getMe();
      setUser(user);

      router.push("/profile");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p>{error}</p>
      </form>
    </main>
  );
}