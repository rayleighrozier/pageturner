import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_SIGNED_IN } from "../../action-types";
import { userSignOut } from "../../actions/supabase";
import "./Nav.css";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector((state) => state.searchResults);
  const signOut = () => {
    userSignOut();
    dispatch({ type: SET_SIGNED_IN, payload: false });
    navigate("/");
  };
  return (
    <div className="nav">
      <div className="nav-pageturner">
        <a href="/">pageturner</a>
      </div>
      <div className="nav-links">
        <a href="/">Shelves</a>
        <a href={`/search/${searchResults.items[0].volumeInfo.title}`}>
          Search
        </a>
        <a onClick={signOut} href="/">
          Sign Out
        </a>
      </div>
    </div>
  );
}
