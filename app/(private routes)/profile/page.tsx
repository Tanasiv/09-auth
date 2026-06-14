import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main>
      <h1>Profile</h1>

      <Image
        src={user.avatar}
        alt={user.username}
        width={120}
        height={120}
      />

      <p>{user.username}</p>
      <p>{user.email}</p>

      <Link href="/profile/edit">Edit profile</Link>
    </main>
  );
}