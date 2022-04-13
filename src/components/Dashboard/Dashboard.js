import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_BOOKS,
  SET_GOOGLE_DATA,
  SET_SIGNED_IN,
  SET_PAGE,
} from "../../action-types";
import { userGetBooks, userSignOut } from "../../actions/supabase";
import { getSingleBook } from "../../actions/googleBooks";
import Error from "../Error";
import Current from "./Current";
import SearchBar from "./SearchBar";
import DashboardShelves from "./DashboardShelves";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedIn = useSelector((state) => state.user.signedIn);
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const googleData = useSelector((state) => state.user.googleData);
  const updateGoogleData = async () => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
  };
  const updateBooks = async (id) => {
    let updatedBooks = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: updatedBooks });
    updateGoogleData();
  };
  const signOut = async () => {
    userSignOut();
    dispatch({ type: SET_SIGNED_IN, payload: false });
    navigate("/");
  };
  useEffect(() => {
    updateBooks(id);
    dispatch({ type: SET_PAGE, payload: "Dashboard" });
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      <SearchBar />
      {signedIn ? (
        <>
          <Current />
          <DashboardShelves />
          <p>All Books</p>
          {googleData?.map((book) => {
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
