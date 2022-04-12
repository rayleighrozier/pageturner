import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_BOOK_LOG, SET_NEW_ENTRY } from "../../action-types";

export default function BookEntryForm() {
  const dispatch = useDispatch();
  const setNewEntry = () => {
    dispatch({ type: SET_NEW_ENTRY, payload: false });
  };
  return (
    <div>
      <form>
        <input type="date" />
        <label>Total Pages Read</label>
        <input type="number" />
        <label>Notes</label>
        <textarea />
        <button>Submit Entry</button>
        <button onClick={setNewEntry}>Go Back</button>
      </form>
    </div>
  );
}
