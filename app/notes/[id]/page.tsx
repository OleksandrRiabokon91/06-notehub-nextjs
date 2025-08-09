// app/notes/[id]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
    : `Created at: ${new Date(note.createdAt).toLocaleString()}`;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient formattedDate={formattedDate} />
    </HydrationBoundary>
  );
}
