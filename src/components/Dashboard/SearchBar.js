import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_SEARCH, SET_PAGE } from "../../action-types";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let search = useSelector((state) => state.search);
  const captureSearch = (e) => {
    e.preventDefault();
    let input = e.target.form[0].value;
    dispatch({ type: SET_SEARCH, payload: input });
  };

  useEffect(() => {
    if (search !== "") {
      navigate(`/search/${search}`);
      dispatch({ type: SET_PAGE, payload: "Search" });
      dispatch({ type: SET_SEARCH, payload: "" });
    }
  }, [search]);
  return (
    <div>
      <form>
        <input type="text" />
        <button onClick={(e) => captureSearch(e)}>Search</button>
      </form>
    </div>
  );
}
