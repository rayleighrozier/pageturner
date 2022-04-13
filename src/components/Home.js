import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
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
