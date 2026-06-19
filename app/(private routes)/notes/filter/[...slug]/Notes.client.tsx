"use client";

import styles from "./Notes.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../../components/Pagination/Pagination";
import NoteList from "../../../../../components/NoteList/NoteList";

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // debounce FIX: useEffect, not useMemo
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <main className={styles.app}>
      <div className={styles.toolbar}>
        <h1>Notes: {tag}</h1>

        <Link href="/notes/action/create" className={styles.button}>
          Create note
        </Link>
      </div>

      <SearchBox value={search} onChange={setSearch} />

      <NoteList notes={notes} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}