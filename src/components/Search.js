import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_RESULTS } from "../action-types";
import { getSearchResults } from "../actions/googleBooks";
import SearchBar from "./Dashboard/SearchBar";

export default function Search() {
  const dispatch = useDispatch();
  const { q } = useParams();
  const searchResults = useSelector((state) => state.searchResults);
  const updateSearchResults = async () => {
    let results = await getSearchResults(q);
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
  };
  useEffect(() => {
    updateSearchResults();
  }, [q]);
  return (
    <div>
      <SearchBar />
      {searchResults
        ? searchResults.items.map((book) => (
            <a href={`/book/${book.id}`}>
              <img src={book?.volumeInfo?.imageLinks?.thumbnail} />
              <p>{book?.volumeInfo?.title}</p>
            </a>
          ))
        : null}
    </div>
  );
}
