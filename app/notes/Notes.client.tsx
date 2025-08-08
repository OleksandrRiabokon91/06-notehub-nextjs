// app/notes/page.tsx
"use client";

import css from "@/app/notes/Notes.client.module.css";
// ⬇️ Импортировал keepPreviousData — в v5 он стал утилитой, а не флагом
import { useQuery, keepPreviousData } from "@tanstack/react-query"; // ← изменено
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import fetchNotes from "../../lib/api";
import type { FetchNotesResponse } from "../../lib/api";

// Объявляем пропсы компонента
interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: debouncedSearchQuery }),

    // ⬇️ В v5 нельзя просто указать keepPreviousData: true
    // Вместо этого используем placeholderData: keepPreviousData
    // чтобы React Query показывал старые данные при загрузке новых
    placeholderData:
      currentPage === 1 && debouncedSearchQuery === ""
        ? initialData // ← начальные данные с сервера (SSR)
        : keepPreviousData, // ← оставляем старый список при смене страницы/поиска
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.left}>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className={css.center}>
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>

        <div className={css.right}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>

        {isModalOpen && (
          <NoteModal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </NoteModal>
        )}
      </header>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage message={error?.message ?? "Unknown error"} />
      ) : data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
// ! ================== prewios app

// import css from "./App.module.css";
// import { useQuery } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
// import { useDebounce } from "use-debounce";

// import NoteList from "@/components/NoteList/NoteList";
// import Pagination from "@/components/Pagination/Pagination";
// import NoteModal from "@/components/NoteModal/NoteModal";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import Loader from "@/components/Loader/Loader";
// import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

// import fetchNotes from "../../lib/api";
// import type { FetchNotesResponse } from "../../lib/api";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery] = useDebounce(searchQuery, 800);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [debouncedSearchQuery]);

//   const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
//     queryKey: ["notes", currentPage, debouncedSearchQuery],
//     queryFn: () =>
//       fetchNotes({ page: currentPage, search: debouncedSearchQuery }),
//     placeholderData: (prev) => prev,
//   });
//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <div className={css.left}>
//           <SearchBox value={searchQuery} onChange={setSearchQuery} />
//         </div>

//         <div className={css.center}>
//           {data && data.totalPages > 1 && (
//             <Pagination
//               totalPages={data.totalPages}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//             />
//           )}
//         </div>

//         <div className={css.right}>
//           <button className={css.button} onClick={() => setIsModalOpen(true)}>
//             Create note +
//           </button>
//         </div>

//         {isModalOpen && (
//           <NoteModal onClose={() => setIsModalOpen(false)}>
//             <NoteForm onClose={() => setIsModalOpen(false)} />
//           </NoteModal>
//         )}
//       </header>

//       {isLoading ? (
//         <Loader />
//       ) : isError ? (
//         <ErrorMessage message={error?.message ?? "Unknown error"} />
//       ) : data && data.notes.length > 0 ? (
//         <>
//           <NoteList notes={data.notes} />
//         </>
//       ) : (
//         <p>No notes found</p>
//       )}
//     </div>
//   );
// }
