"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/app/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProfile() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || "");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = await updateMe({ username });
    setUser(updated);

    router.push("/profile");
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={() => router.push("/profile")}>
        Cancel
      </button>
    </form>
  );
}