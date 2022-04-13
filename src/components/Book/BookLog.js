import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_NEW_ENTRY } from "../../action-types";
import { userUpdateBooks } from "../../actions/supabase";
import { findIndexOfBook } from "../../actions/book";
import BookEntryForm from "./BookEntryForm";

export default function BookLog() {
  const dispatch = useDispatch();
  const newEntry = useSelector((state) => state.newEntry);
  const id = useSelector((state) => state.user.id);
  const allBooks = useSelector((state) => state.user.books.all);
  const books = useSelector((state) => state.user.books);
  const currentBookId = useSelector((state) => state.currentBook.id);
  const currentLogEntries =
    allBooks[findIndexOfBook(currentBookId, allBooks)].log;
  const setNewEntry = () => {
    dispatch({ type: SET_NEW_ENTRY, payload: true });
  };
  //HELP
  useEffect(() => {
    console.log("updating books in supabase on book log");
    userUpdateBooks(id, books);
  }, [allBooks]);

  return (
    <div>
      {currentLogEntries.map((entry) => (
        <div>
          <p>Date</p>
          <p>{entry.date}</p>
          <p>Pages Read</p>
          <p>{entry.pagesRead}</p>
          <p>Notes</p>
          <p>{entry.notes}</p>
        </div>
      ))}
      <button onClick={setNewEntry}>Add Entry</button>
      {newEntry == true ? <BookEntryForm /> : null}
    </div>
  );
}
