import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userGetBooks } from "../../actions/supabase";
import { getSingleBook } from "../../actions/googleBooks";
import { SET_BOOKS, SET_GOOGLE_DATA } from "../../action-types";
import Error from "../Error";
import Current from "./Current";
import SearchBar from "./SearchBar";
import { SET_SIGNED_IN, SET_PAGE } from "../../action-types";
import { userSignOut } from "../../actions/supabase";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedIn = useSelector((state) => state.user.signedIn);
  let books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const googleData = useSelector((state) => state.user.googleData);

  const updateBooks = async (id) => {
    books = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: books });
    updateGoogleData();
  };
  const updateGoogleData = async () => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
  };
  const signOut = async () => {
    userSignOut();
    dispatch({ type: SET_SIGNED_IN, payload: false });
    navigate("/");
  };

  useEffect(() => {
    dispatch({ type: SET_PAGE, payload: "Dashboard" });
    updateBooks(id);
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      <SearchBar />
      {signedIn ? (
        <>
          <Current />
          <p>All Books</p>
          {googleData.map((book) => {
            return (
              <a href={`/book/${book.id}`} key={book.id}>
                <img
                  key={book.volumeInfo?.imageLinks?.thumbnail}
                  src={book.volumeInfo?.imageLinks?.thumbnail}
                />
                <p key={book.volumeInfo?.title}>{book.volumeInfo?.title}</p>
              </a>
            );
          })}
        </>
      ) : (
        <Error />
      )}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
