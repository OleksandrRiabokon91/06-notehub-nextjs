// app/notes/[id]/page.tsx
// импорт функции для запроса на бекэнд для одной нотатки
import { getSingleNote } from "@/lib/api";
// берём айдишник из адресной строки
type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);
  console.log(note);

  return <div>NoteDetails</div>;
};

export default NoteDetails;
