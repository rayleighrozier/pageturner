import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBook } from "../../actions/googleBooks";
import { SET_CURRENT_BOOK, SET_PAGE } from "../../action-types";
import { bookOnShelf } from "../../actions/book";
import BookLog from "./BookLog";
import BookDescription from "./BookDescription";
import BookButtons from "./BookButtons";

export default function Book() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentBook = useSelector((state) => state.currentBook);
  const allBooks = useSelector((state) => state.user.books.all);
  const updateCurrentBook = async () => {
    let data = await getSingleBook(id);
    dispatch({ type: SET_CURRENT_BOOK, payload: data });
  };
  useEffect(() => {
    updateCurrentBook();
    dispatch({ type: SET_PAGE, payload: "Book" });
  }, []);

  return (
    <div>
      <img
        key={currentBook?.volumeInfo?.imageLinks?.thumbnail}
        src={currentBook?.volumeInfo?.imageLinks?.thumbnail}
      />
      <p key={currentBook?.title}>{currentBook?.volumeInfo?.title}</p>
      {bookOnShelf(id, allBooks) ? (
        <>
          <BookLog />
        </>
      ) : (
        <>
          <BookDescription />
        </>
      )}
      <BookButtons />
    </div>
  );
}
