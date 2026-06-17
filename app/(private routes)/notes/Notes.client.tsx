"use client";
import styles from "./Notes.module.css"; 

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types";

export default function NotesClient() {
  const { data } = useQuery({
    queryKey: ["notes", 1, "", "all"],
    queryFn: () => fetchNotes(1, "", "all"),
  });

  const notes = data?.notes ?? [];

return (
  <main className={styles.app}>
    <div className={styles.toolbar}>
      <h1>Notes</h1>

      <button className={styles.button}>
        Create note
      </button>
    </div>

    {notes.map((note: Note) => (
      <div key={note.id}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
    ))}
  </main>
);
}