import Image from "next/image";
import { getMe } from "@/app/api/serverApi";

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main>
      <h1>Profile</h1>

      <Image
        src={user.avatar}
        alt="User avatar"
        width={120}
        height={120}
      />

      <p>{user.username}</p>
      <p>{user.email}</p>
    </main>
  );
}