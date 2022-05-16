import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_RESULTS, RESET_CURRENT_BOOK } from "../../action-types";
import { getSearchResults } from "../../actions/googleBooks";
import { checkToken } from "../../actions/token";
import SearchBar from "../Dashboard/SearchBar";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import "./Search.css";

export default function Search() {
  const dispatch = useDispatch();
  const token = checkToken();
  const { q } = useParams();
  const searchResults = useSelector((state) => state.searchResults);
  const [newSearch, setNewSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateSearchResults = async () => {
    let results = await getSearchResults(q);
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: RESET_CURRENT_BOOK });
    if (q) {
      setNewSearch(true);
    }
  }, []);

  useEffect(() => {
    if (newSearch) {
      setLoading(true);
      updateSearchResults();
      setNewSearch(false);
    }
  }, [newSearch]);

  return (
    <div className="search">
      {token ? (
        <>
          <SearchBar newSearch={newSearch} setNewSearch={setNewSearch} />

          {loading ? (
            <Loading />
          ) : (
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
          )}
        </>
      ) : (
        <Error />
      )}
    </div>
  );
}
