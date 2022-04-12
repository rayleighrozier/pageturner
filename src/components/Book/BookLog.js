import React from "react";
import BookRating from "./BookRating";
import { useSelector, useDispatch } from "react-redux";
import { ADD_BOOK_LOG, SET_NEW_ENTRY } from "../../action-types";
import BookEntryForm from "./BookEntryForm";

export default function BookLog() {
  const dispatch = useDispatch();
  let newEntry = useSelector((state) => state.newEntry);
  let allBooks = useSelector((state) => state.user.books.all);
  let currentBookId = useSelector((state) => state.currentBook.id);
  let entryToSave = useSelector((state) => state.entryToSave);
  //
  const findCurrentBookIndex = (id, shelf) => {
    let index = shelf.findIndex((book) => book.id === id);
    return index;
  };
  let currentBookIndex = findCurrentBookIndex(currentBookId, allBooks);
  let currentBookLog = allBooks[currentBookIndex].log;
  const addToLog = (index, log) => {
    currentBookLog = [...currentBookLog, { notes: "heeyyyyy" }];
    allBooks[currentBookIndex].log = currentBookLog;
    console.log("all books hopefully updated", allBooks);
    dispatch({
      type: ADD_BOOK_LOG,
      payload: {
        index: index,
        updatedLog: log,
      },
    });
  };
  const setNewEntry = () => {
    dispatch({ type: SET_NEW_ENTRY, payload: true });
  };
  return (
    <div>
      <BookRating />
      BookLog
      <button onClick={setNewEntry}>Add Entry</button>
      {newEntry == true ? <BookEntryForm /> : null}
    </div>
  );
}
