import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BOOK_LOG,
  SET_NEW_ENTRY,
  UPDATE_PAGE_COUNT,
} from "../../action-types";

export default function BookEntryForm() {
  const dispatch = useDispatch();
  let allBooks = useSelector((state) => state.user.books.all);
  let currentBookId = useSelector((state) => state.currentBook.id);
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
  const findCurrentBookIndex = (id, shelf) => {
    let index = shelf.findIndex((book) => book.id === id);
    return index;
  };
  let currentBookIndex = findCurrentBookIndex(currentBookId, allBooks);
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
        <label>Total Pages Read</label>
        <input type="number" />
        <label>Notes</label>
        <textarea />
        <button onClick={(e) => sendEntry(e)}>Submit Entry</button>
        <button onClick={() => setNewEntry(false)}>Go Back</button>
      </form>
    </div>
  );
}
