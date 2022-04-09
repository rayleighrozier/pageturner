import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_SIGNED_IN, SIGN_IN_USER, SET_PAGE } from "../action-types/index";
import { userSignIn } from "../actions/supabase";
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
      dispatch({ type: SET_SIGNED_IN, payload: true });
      dispatch({ type: SET_PAGE, payload: "Dashboard" });
    } else {
      window.alert("Invalid login. Try again!");
    }
  };
  return (
    <div>
      <form>
        <p>Sign In</p>
        <div>
          <p>Email</p>
          <input type="text" name="email" />
        </div>
        <div>
          <p>Password</p>
          <input type="text" name="password" />
        </div>
        <button type="submit" onClick={(e) => sendSignIn(e)}>
          Submit
        </button>
      </form>
      <SignInNav />
    </div>
  );
}
