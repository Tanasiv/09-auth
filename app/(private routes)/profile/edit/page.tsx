"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const updated = await updateMe({ username });

    setUser(updated);
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* AVATAR */}
      <Image
        src={user?.avatar || "/default-avatar.png"}
        alt="avatar"
        width={80}
        height={80}
      />

      {/* EMAIL (read-only) */}
      <input value={user?.email || ""} readOnly />

      {/* USERNAME */}
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* BUTTONS */}
      <button type="submit">Save</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}