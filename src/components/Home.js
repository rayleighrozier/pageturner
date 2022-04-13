import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SET_GOOGLE_DATA, SET_BOOKS } from "../action-types";
import { getSingleBook } from "../actions/googleBooks";
import { userGetBooks } from "../actions/supabase";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUp";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedIn = useSelector((state) => state.user.signedIn);
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const page = useSelector((state) => state.page);
  const updateGoogleData = async (id) => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
  };
  const signInProcess = async (id) => {
    let updatedBooks = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: updatedBooks });
    updateGoogleData(id);
    navigate("/dashboard");
  };
  useEffect(() => {
    if (signedIn) {
      signInProcess(id);
    } else {
      navigate("/");
    }
  }, [signedIn]);
  return (
    <div>
      <h1>Home</h1>
      <div>{page === "SignIn" ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}
