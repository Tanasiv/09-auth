"use client";
import styles from "./NoteDetails.module.css";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetails({
  id,
}: {
  id: string;
}) {
  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (!note) return <p>Loading...</p>;

  return (
  <main className={styles.main}>
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={styles.content}>{note.content}</p>

        <span className={styles.tag}>{note.tag}</span>

        <p className={styles.date}>{note.createdAt}</p>
      </div>
    </div>
  </main>
);
}