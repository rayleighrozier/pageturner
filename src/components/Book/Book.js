import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_BOOK, SET_PAGE } from "../../action-types";
import { getSingleBook } from "../../actions/googleBooks";
import { bookOnShelf, getPagesRead } from "../../actions/book";
import { getPercentage } from "../../actions/format";
import BookLog from "./BookLog";
import BookDescription from "./BookDescription";
import BookButtons from "./BookButtons";

export default function Book() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentBook = useSelector((state) => state.currentBook);
  const totalPages = currentBook.volumeInfo.pageCount;
  const allBooks = useSelector((state) => state.user.books.all);
  const pagesRead = getPagesRead(id, allBooks);
  const percentage = getPercentage(pagesRead, totalPages);

  const updateCurrentBook = async () => {
    let data = await getSingleBook(id);
    dispatch({ type: SET_CURRENT_BOOK, payload: data });
  };
  useEffect(() => {
    updateCurrentBook();
    dispatch({ type: SET_PAGE, payload: "Book" });
    getPagesRead(id, allBooks);
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
          <div>
            <p>{`${pagesRead} of ${totalPages} pages read`}</p>
            <p>{`${percentage}% complete`}</p>
          </div>
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
