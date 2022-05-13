import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_BOOKS,
  SET_GOOGLE_DATA,
  SET_PAGE,
  RESET_CURRENT_BOOK,
} from "../../action-types";
import { userGetBooks } from "../../actions/supabase";
import { getSingleBook } from "../../actions/googleBooks";
import { checkToken } from "../../actions/token";
import Error from "../Error/Error";
import Current from "./Current";
import SearchBar from "./SearchBar";
import Loading from "../Loading/Loading";
import DashboardShelves from "./DashboardShelves";
import "./Dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = checkToken();
  const [loading, setLoading] = useState(true);
  const books = useSelector((state) => state.user.books);
  const id = useSelector((state) => state.user.id);
  const googleData = useSelector((state) => state.user.googleData);
  const updateGoogleData = async () => {
    let dataArray = [];
    for (const book of books.all) {
      let data = await getSingleBook(book.id);
      dataArray = [...dataArray, data];
    }
    dispatch({ type: SET_GOOGLE_DATA, payload: dataArray });
    setLoading(false);
  };
  const updateBooks = async (id) => {
    let updatedBooks = await userGetBooks(id);
    dispatch({ type: SET_BOOKS, payload: updatedBooks });
    updateGoogleData();
  };

  useEffect(() => {
    updateBooks(id);
    dispatch({ type: SET_PAGE, payload: "Dashboard" });
    dispatch({ type: RESET_CURRENT_BOOK });
  }, []);

  return (
    <div className="dashboard">
      {token ? (
        loading ? (
          <Loading />
        ) : (
          <>
            <Current />
            <div className="dashboard-middle">
              <SearchBar />
              <DashboardShelves />
            </div>
            <div className="dashboard-all">
              <p className="dashboard-all-title">All Books</p>
              <div className="dashboard-all-books">
                {googleData?.map((book) => {
                  return (
                    <a
                      className="dashboard-shelf-book-card grow"
                      href={`/book/${book.id}`}
                      key={book.id}
                    >
                      <img
                        key={book.volumeInfo?.imageLinks?.thumbnail}
                        src={book.volumeInfo?.imageLinks?.thumbnail}
                      />
                      <p key={book.volumeInfo?.title}>
                        {book.volumeInfo?.title}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )
      ) : (
        <Error />
      )}
    </div>
  );
}
