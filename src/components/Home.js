import React, { useState, useEffect } from "react";
import { userSignUp, userSignIn, userSignOut } from "../actions/supabase";
import searchBooks from "../actions/googleBooks";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let signedIn = useSelector((state) => state.user.signedIn);
  let page = useSelector((state) => state.page);
  useEffect(() => {
    if (signedIn) {
      navigate("/dashboard");
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
