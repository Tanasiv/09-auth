import { fetchNotes } from "@/app/api/serverApi";
import { QueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", "all"],
    queryFn: () => fetchNotes(1, "", "all"),
  });

  const data = queryClient.getQueryData<NotesResponse>([
    "notes",
    1,
    "",
    "all",
  ]);

  const notes = data?.notes ?? [];

  return (
    <main>
      <h1>Notes</h1>

      {notes.map((note: Note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </main>
  );
}