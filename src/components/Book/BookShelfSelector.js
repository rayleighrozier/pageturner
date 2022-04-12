import React from "react";
import { EDIT_SHELVES, ADD_USER_BOOK } from "../../action-types";
import { useSelector, useDispatch } from "react-redux";

export default function BookShelfSelector() {
  const dispatch = useDispatch();
  let editShelves = useSelector((state) => state.editShelves);
  const currentBook = useSelector((state) => state.currentBook);
  const books = useSelector((state) => state.user.books);
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
  const updateShelves = (e) => {
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
    }
    closeShelves();
  };
  return (
    <div>
      <p>Which shelves do you want?</p>
      <form>
        {Object.keys(books).map((shelf) =>
          shelf === "all" ? null : (
            <div>
              <input type="checkbox" name={shelf} />
              <label for={shelf}>{shelf.toUpperCase()}</label>
            </div>
          )
        )}
        <button onClick={(e) => updateShelves(e)}>Submit</button>
        <button onClick={closeShelves}>Go Back</button>
      </form>
    </div>
  );
}
