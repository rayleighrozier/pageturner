import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_USER_BOOK } from "../../action-types";
import { bookOnShelf } from "../../actions/book";
import { userUpdateBooks } from "../../actions/supabase";

export default function BookButtons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.user.books);
  const allBooks = useSelector((state) => state.user.books.all);
  const currentBook = useSelector((state) => state.currentBook);
  const id = useSelector((state) => state.user.id);

  const addToBooks = (shelves) => {
    dispatch({
      type: ADD_USER_BOOK,
      payload: {
        book: { id: currentBook.id, log: [], pagesRead: 0 },
        shelves: shelves,
      },
    });
  };
  useEffect(() => {
    userUpdateBooks(id, books);
  }, []);
  return (
    <div>
      <button>Remove from Shelf</button>
      <button onClick={() => addToBooks(["all", "current"])}>
        Add to Shelf
      </button>
      <button onClick={() => navigate("/dashboard")}>Back to My Shelves</button>
    </div>
  );
}
