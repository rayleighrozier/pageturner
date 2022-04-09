import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userGetBooks } from "../actions/supabase";
import { getSingleBook } from "../actions/googleBooks";
import { SET_BOOKS, SET_GOOGLE_DATA } from "../action-types";
import Error from "./Error";
import DashboardTop from "./dashboard-components/DashboardTop";

export default function Dashboard() {
  let dispatch = useDispatch();
  let signedIn = useSelector((state) => state.user.signedIn);
  let books = useSelector((state) => state.user.books);
  let id = useSelector((state) => state.user.id);
  let googleData = useSelector((state) => state.user.googleData);

  const updateBooks = async (id) => {
    books = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: books });
    updateGoogleData();
  };
  const updateGoogleData = async () => {
    for (const book of books.all) {
      let dataArray = [];
      let data = await getSingleBook(book);
      dataArray = [...dataArray, data];
      dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
    }
  };

  useEffect(() => {
    updateBooks(id);
  }, []);

  return (
    <div>
      Dashboard
      {signedIn ? <DashboardTop /> : <Error />}
      {googleData.map((book) => {
        return <p>{book.volumeInfo.title}</p>;
      })}
    </div>
  );
}
