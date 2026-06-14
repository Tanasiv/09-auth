"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";

export default function NotesClient() {
  const { data } = useQuery({
    queryKey: ["notes", 1, "", "all"],
    queryFn: () => fetchNotes(1, "", "all"),
  });

  const notes = data?.notes ?? [];

  return (
    <main>
      <h1>Notes</h1>

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </main>
  );
}