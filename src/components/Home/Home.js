import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SET_GOOGLE_DATA, SET_BOOKS } from "../../action-types/index";
import { getSingleBook } from "../../actions/googleBooks";
import { userGetBooks } from "../../actions/supabase";
import { checkToken } from "../../actions/token";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignIn/SignUp";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const page = useSelector((state) => state.page);
  const updateGoogleData = async () => {
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
    if (token) {
      signInProcess(id);
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="home">
      <div className="home-sign-in">
        {page === "SignIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
