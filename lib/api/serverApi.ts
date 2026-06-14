import { cookies } from "next/headers";
import { api } from "./api";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

// AUTH CHECK
export const checkSession = async () => {
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return res.data;
};

// NOTES (SSR)
export const fetchNotes = async (
  page: number,
  search: string,
  tag: string
) => {
  const res = await api.get("/notes", {
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
  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return res.data;
};