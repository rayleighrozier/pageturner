import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADD_USER_BOOK,
  SET_GOOGLE_DATA,
  EDIT_SHELVES,
  REMOVE_USER_BOOK,
} from "../../action-types";
import { bookOnShelf } from "../../actions/book";
import { userUpdateBooks } from "../../actions/supabase";
import { getSingleBook } from "../../actions/googleBooks";
import BookShelfSelector from "./BookShelfSelector";

export default function BookButtons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.user.books);
  const allBooks = useSelector((state) => state.user.books.all);
  const currentBook = useSelector((state) => state.currentBook);
  const id = useSelector((state) => state.user.id);
  let editShelves = useSelector((state) => state.editShelves);
  const updateGoogleData = async () => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
  };
  const addToBooks = async (shelf) => {
    dispatch({
      type: ADD_USER_BOOK,
      payload: {
        book: { id: currentBook.id, log: [], pagesRead: 0 },
        shelf: shelf,
      },
    });
  };
  const selectShelves = () => {
    dispatch({ type: EDIT_SHELVES, payload: true });
  };
  useEffect(() => {
    console.log("updating books in supabase");
    userUpdateBooks(id, books);
  }, [books]);

  const removeBook = (shelf) => {
    dispatch({
      type: REMOVE_USER_BOOK,
      payload: {
        book: { id: currentBook.id, log: [], pagesRead: 0 },
        shelf: shelf,
      },
    });
  };

  return (
    <div>
      <button onClick={() => removeBook("all")}>Remove from My Books</button>
      <button onClick={() => addToBooks("all")}>Add to My Books</button>
      <button onClick={selectShelves}>Edit Shelves</button>
      <button onClick={() => navigate("/dashboard")}>Back to My Shelves</button>
      {editShelves ? <BookShelfSelector /> : null}
    </div>
  );
}
