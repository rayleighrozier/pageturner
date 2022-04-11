import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBook } from "../actions/googleBooks";
import { SET_CURRENT_BOOK } from "../action-types";
// SET PAGE
export default function Book() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentBook = useSelector((state) => state.currentBook);

  const updateCurrentBook = async () => {
    let data = await getSingleBook(id);
    dispatch({ type: SET_CURRENT_BOOK, payload: data });
  };

  useEffect(() => {
    updateCurrentBook();
    console.log(currentBook);
  }, []);
  //   const fetchBook = async () => {
  //     const data = await getSingleBook(id);
  //     return data;
  //   };
  //   useEffect(() => {
  //     book = fetchBook();
  //   }, []);
  return (
    <div>
      Book
      <p>{id}</p>
      <p>{currentBook.volumeInfo.title}</p>
    </div>
  );
}
