import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_SIGNED_IN, SET_SEARCH_RESULTS } from "../../action-types";
import { userSignOut } from "../../actions/supabase";
import "./Nav.css";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedIn = useSelector((state) => state.user.signedIn);
  const signOut = () => {
    userSignOut();
    dispatch({ type: SET_SIGNED_IN, payload: false });
    dispatch({ type: SET_SEARCH_RESULTS, payload: null });
    navigate("/");
  };
  return (
    <div className="nav">
      <div className="nav-pageturner">
        <a href="/">pageturner</a>
      </div>
      {signedIn ? (
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
