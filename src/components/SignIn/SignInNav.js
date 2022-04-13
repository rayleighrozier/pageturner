import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_PAGE } from "../../action-types/index";

export default function SignInNav() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const ChangePage = (destination) => {
    dispatch({ type: SET_PAGE, payload: destination });
  };
  return (
    <div>
      {page === "SignIn" ? (
        <div className="home-nav">
          <p>New to pageturner?</p>
          <button
            className="button-default"
            onClick={() => ChangePage("SignUp")}
          >
            Sign up here
          </button>
        </div>
      ) : (
        <div className="home-nav">
          <p>Already have a pageturner account?</p>
          <button
            className="button-default"
            onClick={() => ChangePage("SignIn")}
          >
            Sign in here
          </button>
        </div>
      )}
    </div>
  );
}
