import React, { useEffect } from "react";
import BookRating from "./BookRating";
import { useSelector, useDispatch } from "react-redux";
import { ADD_BOOK_LOG, SET_NEW_ENTRY } from "../../action-types";
import { userUpdateBooks } from "../../actions/supabase";
import BookEntryForm from "./BookEntryForm";

export default function BookLog() {
  const dispatch = useDispatch();
  let newEntry = useSelector((state) => state.newEntry);
  let allBooks = useSelector((state) => state.user.books.all);
  let currentBookId = useSelector((state) => state.currentBook.id);
  const id = useSelector((state) => state.user.id);
  const findCurrentBookIndex = (id, shelf) => {
    let index = shelf.findIndex((book) => book.id === id);
    return index;
  };
  let currentLogEntries =
    allBooks[findCurrentBookIndex(currentBookId, allBooks)].log;
  const setNewEntry = () => {
    dispatch({ type: SET_NEW_ENTRY, payload: true });
  };
  useEffect(() => {
    console.log("updating books in supabase");
    userUpdateBooks(id, books);
  }, [allBooks]);

  return (
    <div>
      <BookRating />
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
