import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BOOK_LOG,
  SET_NEW_ENTRY,
  UPDATE_PAGE_COUNT,
} from "../../action-types";
import { findIndexOfBook } from "../../actions/book";
import { formatDate } from "../../actions/format";

export default function BookEntryForm() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.user.books.all);
  const currentBookId = useSelector((state) => state.currentBook.id);
  const currentBookIndex = findIndexOfBook(currentBookId, allBooks);
  const setNewEntry = (value) => {
    dispatch({ type: SET_NEW_ENTRY, payload: value });
  };
  const captureEntry = (e) => {
    e.preventDefault();
    const date = formatDate(e.target.form[0].value);
    let input = {
      date: date,
      pagesRead: e.target.form[1].value,
      notes: e.target.form[2].value,
    };
    return input;
  };
  const sendEntry = (e) => {
    let entry = captureEntry(e);
    dispatch({
      type: ADD_BOOK_LOG,
      payload: { index: currentBookIndex, newLog: entry },
    });
    dispatch({
      type: UPDATE_PAGE_COUNT,
      payload: { index: currentBookIndex, number: entry.pagesRead },
    });
    setNewEntry(false);
  };
  return (
    <div className="book-entry-form-container white shadow">
      <form className="book-entry-form">
        <input className="book-entry-date" type="date" />
        <div className="book-entry-pages">
          <p>Pages Read</p>
          <input type="number" />
        </div>
        <div className="book-entry-notes">
          <p>Notes</p>
          <textarea />
        </div>
        <div className="book-entry-buttons">
          <button
            className="button-default color-1"
            onClick={(e) => sendEntry(e)}
          >
            Submit Entry
          </button>
          <button
            className="button-default color-1"
            onClick={() => setNewEntry(false)}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
