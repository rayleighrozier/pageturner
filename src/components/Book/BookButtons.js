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
  const currentBooks = useSelector((state) => state.user.books.current);
  const favoritesBooks = useSelector((state) => state.user.books.favorites);
  const tbrBooks = useSelector((state) => state.user.books.tbr);
  const currentBook = useSelector((state) => state.currentBook);
  const currentBookId = useSelector((state) => state.currentBook.id);
  const id = useSelector((state) => state.user.id);
  const editShelves = useSelector((state) => state.editShelves);

  const addToBooks = (shelf) => {
    dispatch({
      type: ADD_USER_BOOK,
      payload: {
        book: {
          id: currentBook.id,
          log: [],
          pagesRead: 0,
          totalPages: currentBook.volumeInfo.pageCount,
        },
        shelf: shelf,
      },
    });
  };

  useEffect(() => {
    console.log("updating books in supabase from book buttons", books);
    userUpdateBooks(id, books);
  }, [books, allBooks, currentBooks, tbrBooks, favoritesBooks]);

  const selectShelves = () => {
    dispatch({ type: EDIT_SHELVES, payload: true });
  };

  const removeBook = (shelves) => {
    for (const shelf of shelves) {
      dispatch({
        type: REMOVE_USER_BOOK,
        payload: {
          book: { id: currentBook.id, log: [], pagesRead: 0 },
          shelf: shelf,
        },
      });
    }
  };

  return (
    <div>
      <div className="book-buttons">
        {bookOnShelf(currentBookId, allBooks) ? (
          <>
            <button className="button-larger color-1" onClick={selectShelves}>
              Edit Shelves
            </button>

            <button
              className="button-larger color-1"
              onClick={() => removeBook(["all", "current", "favorites", "tbr"])}
            >
              Remove from My Books
            </button>
          </>
        ) : (
          <button
            className="button-larger color-1"
            onClick={() => addToBooks("all")}
          >
            Add to My Books
          </button>
        )}

        <button
          className="button-larger color-1"
          onClick={() => navigate("/dashboard")}
        >
          Back to Shelves
        </button>
      </div>
      {editShelves ? <BookShelfSelector /> : null}
    </div>
  );
}
