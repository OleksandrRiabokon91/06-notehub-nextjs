// app/notes/page.tsx
import fetchNotes from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const data = await fetchNotes({ page: 1, search: "" });
  return <NotesClient initialData={data} />;
}
