import React from "react";
import { useDispatch } from "react-redux";
import { SET_PAGE } from "../action-types";
import { userSignUp } from "../actions/supabase";
import SignInNav from "./SignInNav";

export default function SignUp() {
  const dispatch = useDispatch();
  const captureSignUp = (e) => {
    e.preventDefault();
    let input = {
      email: e.target.form[0].value,
      password: e.target.form[1].value,
    };
    return input;
  };
  const sendSignUp = async (e) => {
    let input = captureSignUp(e);
    let currentUser = await userSignUp(input.email, input.password);
    console.log(currentUser);
    if (currentUser.message) {
      window.alert(`${currentUser.message}`);
    } else {
      window.alert("Account created! Check your email to confirm and sign in.");
      dispatch({ type: SET_PAGE, payload: "SignIn" });
    }
  };
  return (
    <div>
      <form>
        <p>SignUp</p>
        <div>
          <p>Email</p>
          <input type="text" name="email" />
        </div>
        <div>
          <p>Password</p>
          <input type="text" name="password" />
        </div>
        <button onClick={sendSignUp}>Submit</button>
      </form>
      <SignInNav />
    </div>
  );
}
