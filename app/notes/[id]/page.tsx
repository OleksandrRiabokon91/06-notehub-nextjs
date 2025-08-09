// app/notes/[id]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// импорт функции для запроса на бекэнд для одной нотатки
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/NoteDetailsClient/NoteDetailsClient";
// берём айдишник из адресной строки
// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);
//   console.log(note);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;
// ! ========================
export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", Number(id)],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

// ! ================

// type Props = {
//   params: { id: string };
// };

// const NoteDetails = async ({ params }: Props) => {
//   const note = await getSingleNote(params.id);

//   if (!note) {
//     return <div>Заметка не найдена</div>;
//   }

//   return (
//     <NoteDetailsClient>
//       <h1>{note.title}</h1>
//       <p>{note.content}</p>
//       <small>Создано: {new Date(note.createdAt).toLocaleString()}</small>
//     </NoteDetailsClient>
//   );
// };

// export default NoteDetails;
