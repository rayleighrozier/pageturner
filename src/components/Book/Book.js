import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_BOOK, SET_PAGE } from "../../action-types";
import { getSingleBook } from "../../actions/googleBooks";
import { bookOnShelf, getPagesRead, findIndexOfBook } from "../../actions/book";
import { getPercentage } from "../../actions/format";
import { checkToken } from "../../actions/token";
import BookLog from "./BookLog";
import BookDescription from "./BookDescription";
import BookButtons from "./BookButtons";
import Error from "../Error/Error";
import "./Book.css";

export default function Book() {
  const dispatch = useDispatch();
  const token = checkToken();
  const { id } = useParams();
  const [shelved, setShelved] = useState(false);
  const currentBook = useSelector((state) => state.currentBook);
  const totalPages = currentBook?.volumeInfo?.pageCount;
  const allBooks = useSelector((state) => state.user.books.all);

  let pagesRead = getPagesRead(id, allBooks);
  let percentage = getPercentage(pagesRead, totalPages);
  const updateCurrentBook = async () => {
    let data = await getSingleBook(id);
    dispatch({ type: SET_CURRENT_BOOK, payload: data });
  };
  useEffect(() => {
    updateCurrentBook();
    dispatch({ type: SET_PAGE, payload: "Book" });
    if (bookOnShelf(id, allBooks)) {
      setShelved(true);
    }
  }, []);

  return (
    <div className="book color-7">
      {token ? (
        <>
          <div className="book-top color-2">
            <img
              key={currentBook?.volumeInfo?.imageLinks?.thumbnail}
              src={currentBook?.volumeInfo?.imageLinks?.thumbnail}
            />
            <div className="book-top-text">
              <p className="book-top-title" key={currentBook?.title}>
                {currentBook?.volumeInfo?.title}
              </p>{" "}
              {shelved ? (
                <>
                  <div className="book-progress">
                    <p>{`${pagesRead} of ${totalPages} pages read`}</p>
                    <p>{`${percentage}% complete`}</p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <BookButtons shelved={shelved} setShelved={setShelved} />
          {shelved ? (
            <>
              <BookLog />
            </>
          ) : (
            <>
              <BookDescription />
            </>
          )}
        </>
      ) : (
        <Error />
      )}
    </div>
  );
}
