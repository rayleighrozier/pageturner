import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_RESULTS } from "../../action-types";
import { getSearchResults } from "../../actions/googleBooks";
import SearchBar from "../Dashboard/SearchBar";
import "./Search.css";

export default function Search() {
  const dispatch = useDispatch();
  const { q } = useParams();
  const searchResults = useSelector((state) => state.searchResults);
  const [newSearch, setNewSearch] = useState(false);
  const updateSearchResults = async () => {
    let results = await getSearchResults(q);
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
  };

  useEffect(() => {
    if (q) {
      setNewSearch(true);
    }
  }, []);

  useEffect(() => {
    if (newSearch) {
      updateSearchResults();
      setNewSearch(false);
    }
  }, [newSearch]);
  return (
    <div className="search">
      <SearchBar newSearch={newSearch} setNewSearch={setNewSearch} />
      <div className="search-results-container">
        {searchResults
          ? searchResults?.items.map((book) => (
              <a
                className="search-result grow-tiny white shadow"
                href={`/book/${book.id}`}
              >
                <img src={book?.volumeInfo?.imageLinks?.thumbnail} />
                <p>{book?.volumeInfo?.title}</p>
              </a>
            ))
          : null}
      </div>
    </div>
  );
}
