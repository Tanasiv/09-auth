"use client";

import styles from "./NotePreview.module.css";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

import Modal from "@/components/Modal/Modal";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        <p>Error loading note</p>
      </Modal>
    );
  }

  return (
  <Modal onClose={handleClose}>
    <h2 className={styles.title}>{data.title}</h2>
    <p className={styles.content}>{data.content}</p>
    <p className={styles.tag}>{data.tag}</p>

    <button className={styles.closeButton} onClick={handleClose}>
      Close
    </button>
  </Modal>
);
}