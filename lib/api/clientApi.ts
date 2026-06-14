import { api } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

/* -------------------- AUTH -------------------- */

export const register = async (data: {
  email: string;
  password: string;
}) => {
  await api.post("/auth/register", data);
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  await api.post("/auth/login", data);
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await api.get<User | null>("/auth/session");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};

/* -------------------- NOTES -------------------- */

type CreateNote = {
  title: string;
  content: string;
  tag: string;
};

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag: string,
  cookie?: string
) => {
  const res = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag: tag === "all" ? undefined : tag,
    },
    headers: cookie ? { Cookie: cookie } : {},
  });

  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: CreateNote) => {
  const res = await api.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};