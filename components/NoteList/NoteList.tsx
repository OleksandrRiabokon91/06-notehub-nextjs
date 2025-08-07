// components/NoteList/NoteList.tsx

// import { Note } from "../../types/note";
// import NoteItem from "../NoteItem/NoteItem";

// type Props = {
//   notes: Note[];
// };

// const NoteList = ({ notes }: Props) => {
//   return (
//     <ul>
//       {notes.map((note) => (
//         <NoteItem key={note.id} item={note} />
//       ))}
//     </ul>
//   );
// };

// export default NoteList;

// ! =======================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Ошибка при удалении заметки:", error);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.status === "pending"}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
