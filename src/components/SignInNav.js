import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_PAGE } from "../action-types";

export default function SignInNav() {
  let dispatch = useDispatch();
  let page = useSelector((state) => state.page);
  const ChangePage = (destination) => {
    dispatch({ type: SET_PAGE, payload: destination });
  };
  return (
    <div>
      {page === "SignIn" ? (
        <div>
          <p>New to pageturner?</p>
          <button onClick={() => ChangePage("SignUp")}>Sign up here</button>
        </div>
      ) : (
        <div>
          <p>Already have a pageturner account?</p>
          <button onClick={() => ChangePage("SignIn")}>Sign in here</button>
        </div>
      )}
    </div>
  );
}
