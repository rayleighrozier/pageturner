import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBook } from "../../actions/googleBooks";
import {
  SET_CURRENT_BOOK,
  SET_PAGE,
  SET_GOOGLE_DATA,
} from "../../action-types";
import { bookOnShelf } from "../../actions/book";
import BookLog from "./BookLog";
import BookDescription from "./BookDescription";
import BookButtons from "./BookButtons";

export default function Book() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const books = useSelector((state) => state.user.books);
  const currentBook = useSelector((state) => state.currentBook);
  const totalPages = currentBook.volumeInfo.pageCount;
  const allBooks = useSelector((state) => state.user.books.all);
  const findIndexofBook = (bookId) => {
    let index = allBooks.findIndex((book) => book.id === bookId);
    return index;
  };

  const getPagesRead = () => {
    if (bookOnShelf(id, allBooks)) {
      let index = findIndexofBook(currentBook.id);
      let pages = allBooks[index].pagesRead;
      return pages;
    }
  };
  const pagesRead = getPagesRead();
  const updateCurrentBook = async () => {
    let data = await getSingleBook(id);
    dispatch({ type: SET_CURRENT_BOOK, payload: data });
  };
  useEffect(() => {
    updateCurrentBook();
    dispatch({ type: SET_PAGE, payload: "Book" });
    getPagesRead();
  }, []);
  const getPercentage = (pagesRead, totalPages) => {
    const round = (value, precision) => {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    };
    return round((100 * pagesRead) / totalPages);
  };
  let percentage = getPercentage(pagesRead, totalPages);

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
