"use client";
// Обов`язково у клієнтському компоненті NoteDetailsClient опрацюйте стани isLoading, error та випадок коли детальну інформацію по нотатці не було отримано в клієнтському компоненті NoteDetailsClient. Поки що буде достатньо повернути наступну розмітку:

// // isLoading
// <p>Loading, please wait...</p>

// // error, !note
// <p>Something went wrong.</p>;

// Якщо нотатку за переданим айді було знайдено, то компонент NoteDetailsClient має створювати наступну розмітку:

// <div className={css.container}>
// 	<div className={css.item}>
// 	  <div className={css.header}>
// 	    <h2>Note title</h2>
// 	  </div>
// 	  <p className={css.content}>Note content</p>
// 	  <p className={css.date}>Created date</p>
// 	</div>
// </div>
