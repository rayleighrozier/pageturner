import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BOOK_LOG,
  SET_NEW_ENTRY,
  UPDATE_PAGE_COUNT,
} from "../../action-types";
import { findIndexOfBook } from "../../actions/book";

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
    let input = {
      date: e.target.form[0].value,
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
    <div>
      <form>
        <input type="date" />
        <p>Total Pages Read</p>
        <input type="number" />
        <p>Notes</p>
        <textarea />
        <button onClick={(e) => sendEntry(e)}>Submit Entry</button>
        <button onClick={() => setNewEntry(false)}>Go Back</button>
      </form>
    </div>
  );
}
