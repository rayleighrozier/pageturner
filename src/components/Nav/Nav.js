import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RESET_SEARCH_RESULTS,
  RESET_USER,
  SET_PAGE,
  RESET_CURRENT_BOOK,
} from "../../action-types";
import { userSignOut } from "../../actions/supabase";
import { checkToken } from "../../actions/token";
import "./Nav.css";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const signOut = () => {
    userSignOut();
    dispatch({ type: RESET_USER });
    dispatch({ type: RESET_CURRENT_BOOK });
    dispatch({ type: RESET_SEARCH_RESULTS });
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
