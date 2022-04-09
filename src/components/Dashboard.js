import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userGetBooks } from "../actions/supabase";
import { getSingleBook } from "../actions/googleBooks";
import { SET_BOOKS } from "../action-types";
import Error from "./Error";
import DashboardTop from "./dashboard-components/DashboardTop";

export default function Dashboard() {
  let dispatch = useDispatch();
  let signedIn = useSelector((state) => state.user.signedIn);
  let id = useSelector((state) => state.user.id);
  const updateBooks = async (id) => {
    let books = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: books });
  };
  // const displayAllBooks = async (id) => {
  //   let userBooks = await userGetBooks(id);
  //   for (const book of userBooks.all) {
  //     let fromGoogle = await getSingleBook(book);
  //     console.log("from google", fromGoogle);
  //   }
  // console.log(getSingleBook("hqsTnQEACAAJ"));

  updateBooks(id);
  return (
    <div>
      Dashboard
      {signedIn ? <DashboardTop /> : <Error />}
    </div>
  );
}
