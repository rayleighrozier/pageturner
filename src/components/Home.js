import React from "react";
import { userSignUp, userSignIn, userSignOut } from "../actions/supabase";
import searchBooks from "../actions/googleBooks";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Home() {
  let dispatch = useDispatch();
  let loggedIn = useSelector((state) => state.user.loggedIn);
  console.log(loggedIn);
  return (
    <div>
      <h1>Home</h1>
      <Login />
    </div>
  );
}
