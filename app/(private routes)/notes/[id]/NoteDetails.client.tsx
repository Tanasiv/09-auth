"use client";

import styles from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

type Props = {
  id: string;
};

export default function NoteDetails({ id }: Props) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <main className={styles.main}>
        <p>Loading...</p>
      </main>
    );
  }

  if (isError || !note) {
    return (
      <main className={styles.main}>
        <p>Error loading note</p>
      </main>
    );
  }

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