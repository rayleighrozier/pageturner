import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EDIT_SHELVES,
  ADD_USER_BOOK,
  REMOVE_USER_BOOK,
} from "../../action-types";
import { userUpdateBooks } from "../../actions/supabase";

export default function BookShelfSelector() {
  const dispatch = useDispatch();
  const currentBook = useSelector((state) => state.currentBook);
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const [shelfUpdate, setShelfUpdate] = useState(false);
  const closeShelves = () => {
    dispatch({ type: EDIT_SHELVES, payload: false });
  };
  const captureSelection = (e) => {
    e.preventDefault();
    let input = {
      current: e.target.form[0].checked,
      favorites: e.target.form[1].checked,
      tbr: e.target.form[2].checked,
    };
    console.log("input", input);
    return input;
  };
  const updateShelves = (e) => {
    let selection = captureSelection(e);
    for (const shelf in selection) {
      if (selection[shelf] === true) {
        console.log("self is true", shelf);
        dispatch({
          type: ADD_USER_BOOK,
          payload: {
            book: { id: currentBook.id },
            shelf: shelf,
          },
        });
      }
      if (selection[shelf] === false) {
        console.log("self is flase", shelf);
        dispatch({
          type: REMOVE_USER_BOOK,
          payload: {
            book: { id: currentBook.id },
            shelf: shelf,
          },
        });
      }
    }
    setShelfUpdate(true);
    console.log("current state of shelfUpdate", shelfUpdate);
  };

  useEffect(() => {
    if (shelfUpdate) {
      console.log("shelf updateeeee", books);
      userUpdateBooks(id, books);
      setShelfUpdate(false);
      closeShelves();
    }
  }, [shelfUpdate]);

  return (
    <div className="book-shelf-selector white shadow">
      <p className="book-shelf-selector-title">
        Which shelves should this book be on?
      </p>
      <form>
        {Object.keys(books).map((shelf) =>
          shelf === "all" ? null : (
            <div className="book-shelf-selector-choice" key={shelf}>
              <input type="checkbox" name={shelf} />
              <label>{shelf.toUpperCase()}</label>
            </div>
          )
        )}
        <div className="book-shelf-selector-buttons">
          <button
            className="button-default color-1"
            onClick={(e) => updateShelves(e)}
          >
            Submit
          </button>
          <button className="button-default color-1" onClick={closeShelves}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}
