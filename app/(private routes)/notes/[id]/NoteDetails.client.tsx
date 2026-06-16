"use client";

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
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>
    </main>
  );
}