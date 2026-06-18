"use client";
import styles from "./EditProfilePage.module.css";

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
    <form className={styles.mainContent} onSubmit={handleSubmit}>
      <div className={styles.profileCard}>

        <h1 className={styles.formTitle}>Edit Profile</h1>

        <Image
          className={styles.avatar}
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          width={80}
          height={80}
        />

        <div className={styles.profileInfo}>

          <input
            className={styles.input}
            value={user?.email || ""}
            readOnly
          />

          <input
            className={styles.input}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>

        <div className={styles.actions}>

          <button className={styles.saveButton} type="submit">
            Save
          </button>

          <button
            className={styles.cancelButton}
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>

        </div>
      </div>
    </form>
  );
}