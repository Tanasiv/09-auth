"use client";

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
    <main>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}