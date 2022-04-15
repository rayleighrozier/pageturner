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
    allBooks[findIndexOfBook(currentBookId, allBooks)]?.log;
  const setNewEntry = () => {
    dispatch({ type: SET_NEW_ENTRY, payload: true });
    userUpdateBooks(id, books);
  };

  // useEffect(() => {
  //   userUpdateBooks(id, books);
  // }, [allBooks]);

  return (
    <div className="book-log color-6 shadow">
      <p className="book-log-title">Log</p>
      <div className="book-log-entries">
        {currentLogEntries?.map((entry) => (
          <div className="book-log-entry white shadow">
            <div className="book-log-entry-field">
              <p className="book-log-entry-title">Date</p>
              <p className="book-log-entry-data">{entry.date}</p>
            </div>
            <div className="book-log-entry-field">
              <p className="book-log-entry-title">Pages Read</p>
              <p className="book-log-entry-data">{entry.pagesRead}</p>
            </div>
            <div className="book-log-entry-field">
              <p className="book-log-entry-title">Notes</p>
              <p className="book-log-entry-data">{entry.notes}</p>
            </div>
          </div>
        ))}
      </div>

      {newEntry == true ? (
        <BookEntryForm />
      ) : (
        <div className="book-entry-button">
          <button className=" button-larger color-1" onClick={setNewEntry}>
            Add Entry
          </button>{" "}
        </div>
      )}
    </div>
  );
}
