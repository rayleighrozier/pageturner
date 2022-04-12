import React, { useEffect } from "react";
import SearchBar from "./Dashboard/SearchBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../actions/googleBooks";
import { SET_SEARCH_RESULTS } from "../action-types";

export default function Search() {
  const { q } = useParams();
  const dispatch = useDispatch();
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
