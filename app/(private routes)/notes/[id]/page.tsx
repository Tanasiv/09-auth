import type { Metadata } from "next";

import { fetchNoteById } from "@/lib/api/serverApi";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NoteDetails from "./NoteDetails.client";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 150),
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}