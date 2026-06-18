import styles from "./ProfilePage.module.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>

        <div className={styles.header}>
          <h1 className={styles.formTitle}>Profile</h1>

          <Link className={styles.editProfileButton} href="/profile/edit">
            Edit profile
          </Link>
        </div>

        <div className={styles.avatarWrapper}>
          <Image
            className={styles.avatar}
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
          />
        </div>

        <div className={styles.profileInfo}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>

      </div>
    </main>
  );
}