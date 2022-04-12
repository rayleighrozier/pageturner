import React from "react";
import {
  EDIT_SHELVES,
  ADD_USER_BOOK,
  REMOVE_USER_BOOK,
} from "../../action-types";
import { useSelector, useDispatch } from "react-redux";
import { userUpdateBooks } from "../../actions/supabase";
import { bookOnShelf } from "../../actions/book";

export default function BookShelfSelector() {
  const dispatch = useDispatch();
  let editShelves = useSelector((state) => state.editShelves);
  const currentBook = useSelector((state) => state.currentBook);
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const closeShelves = () => {
    dispatch({ type: EDIT_SHELVES, payload: false });
  };
  const getShelfOptions = () => {
    console.log(Object.keys(books));
  };
  const captureSelection = (e) => {
    e.preventDefault();
    let input = {
      current: e.target.form[0].checked,
      favorites: e.target.form[1].checked,
      tbr: e.target.form[2].checked,
    };
    return input;
  };
  const updateShelves = async (e) => {
    let selection = captureSelection(e);
    for (const shelf in selection) {
      // change book here if log isn't transferring
      console.log(selection[shelf]);
      if (selection[shelf] === true) {
        dispatch({
          type: ADD_USER_BOOK,
          payload: {
            book: { id: currentBook.id },
            shelf: shelf,
          },
        });
      }
      if (selection[shelf] === false) {
        dispatch({
          type: REMOVE_USER_BOOK,
          payload: {
            book: { id: currentBook.id },
            shelf: shelf,
          },
        });
      }
    }
    await userUpdateBooks(id, books);
    closeShelves();
  };

  return (
    <div>
      <p>Which shelves should this book be on?</p>
      <form>
        {Object.keys(books).map((shelf) =>
          shelf === "all" ? null : (
            <div key={shelf}>
              <input type="checkbox" name={shelf} />
              <label>{shelf.toUpperCase()}</label>
            </div>
          )
        )}
        <button onClick={(e) => updateShelves(e)}>Submit</button>
        <button onClick={closeShelves}>Go Back</button>
      </form>
    </div>
  );
}
