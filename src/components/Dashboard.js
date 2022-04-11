import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userGetBooks } from "../actions/supabase";
import { getSingleBook } from "../actions/googleBooks";
import { SET_BOOKS, SET_GOOGLE_DATA } from "../action-types";
import Error from "./Error";
import DashboardTop from "./dashboard-components/DashboardTop";

export default function Dashboard() {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  let books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const googleData = useSelector((state) => state.user.googleData);

  const updateBooks = async (id) => {
    books = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: books });
    updateGoogleData();
    console.log("google data", googleData);
  };
  const updateGoogleData = async () => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
  };

  useEffect(() => {
    updateBooks(id);
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      {signedIn ? (
        <>
          {/* <DashboardTop /> */}
          <p>All Books</p>
          {googleData.map((book) => {
            return (
              <div>
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                <p>{book.volumeInfo.title}</p>
              </div>
            );
          })}
        </>
      ) : (
        <Error />
      )}
    </div>
  );
}
