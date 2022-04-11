import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_USER_BOOK, SET_GOOGLE_DATA } from "../../action-types";
import { bookOnShelf } from "../../actions/book";
import { userUpdateBooks } from "../../actions/supabase";
import { getSingleBook } from "../../actions/googleBooks";

export default function BookButtons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.user.books);
  const allBooks = useSelector((state) => state.user.books.all);
  const currentBook = useSelector((state) => state.currentBook);
  const id = useSelector((state) => state.user.id);
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
  useEffect(() => {
    console.log("updating books in supabase");
    userUpdateBooks(id, books);
  }, [books]);
  return (
    <div>
      <button>Remove from Shelf</button>
      <button onClick={() => addToBooks("all")}>Add to My Books</button>
      <button onClick={() => navigate("/dashboard")}>Back to My Shelves</button>
    </div>
  );
}
