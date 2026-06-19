import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

/* ---------------- COOKIE ---------------- */

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

/* ---------------- AUTH ---------------- */

export const checkSession = async () => {
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res.data;
};
/* ---------------- NOTES ---------------- */

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
) => {
  const res = await api.get<NotesResponse>("/notes", {
    headers: {
      Cookie: await getCookieHeader(),
    },
    params: {
      page,
      perPage: 12,
      search,
      tag: tag === "all" ? undefined : tag,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res.data;
};