import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_SEARCH_RESULTS, RESET_USER, SET_PAGE } from "../../action-types";
import { userSignOut } from "../../actions/supabase";
import { checkToken } from "../../actions/token";
import "./Nav.css";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const signOut = () => {
    userSignOut();
    dispatch({ type: RESET_USER, payload: null });
    dispatch({ type: SET_SEARCH_RESULTS, payload: null });
    dispatch({ type: SET_PAGE, payload: "SignIn" });
    navigate("/");
  };
  return (
    <div className="nav">
      <div className="nav-pageturner">
        <a href="/">pageturner</a>
      </div>
      {token ? (
        <div className="nav-links">
          <a href="/">Shelves</a>
          <a href="/search">Search</a>
          <a onClick={signOut} href="/">
            Sign Out
          </a>
        </div>
      ) : null}
    </div>
  );
}
