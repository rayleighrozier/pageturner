import React, { useState } from "react";
import { userSignUp, userSignIn, userSignOut } from "../actions/supabase";
import searchBooks from "../actions/googleBooks";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Home() {
  let dispatch = useDispatch();
  let signedIn = useSelector((state) => state.user.signedIn);
  let page = useSelector((state) => state.page);
  return (
    <div>
      <h1>Home</h1>
      <div>{page === "SignIn" ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}
