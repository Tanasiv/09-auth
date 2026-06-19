import type { Note } from "@/types";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}