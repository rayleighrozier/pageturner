import React from "react";
import { useDispatch } from "react-redux";
import { SIGN_IN_USER, SET_PAGE } from "../../action-types/index";
import { userSignIn } from "../../actions/supabase";
import SignInNav from "./SignInNav";

export default function SignIn() {
  const dispatch = useDispatch();
  const captureSignIn = (e) => {
    e.preventDefault();
    let input = {
      email: e.target.form[0].value,
      password: e.target.form[1].value,
    };
    return input;
  };
  const sendSignIn = async (e) => {
    let input = captureSignIn(e);
    let currentUser = await userSignIn(input.email, input.password);
    if (currentUser.message !== "Invalid login credentials") {
      dispatch({ type: SIGN_IN_USER, payload: currentUser });
      dispatch({ type: SET_PAGE, payload: "Dashboard" });
    } else {
      window.alert("Invalid sign in. Try again!");
    }
  };
  return (
    <div className="home-container">
      <form className="home-form">
        <p className="home-title">Sign In</p>
        <div className="home-input">
          <p>Email</p>
          <input type="text" name="email" />
        </div>
        <div className="home-input">
          <p>Password</p>
          <input type="text" name="password" />
        </div>
        <button
          className="button-default color-2"
          type="submit"
          onClick={(e) => sendSignIn(e)}
        >
          Submit
        </button>
      </form>
      <SignInNav />
    </div>
  );
}
