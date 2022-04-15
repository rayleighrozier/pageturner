import React from "react";
import { useSelector } from "react-redux";
import { getShelfGoogleData } from "../../actions/googleBooks";

export default function DashboardShelves() {
  const googleData = useSelector((state) => state.user.googleData);
  const current = useSelector((state) => state.user.books.current);
  const currentGoogleData = getShelfGoogleData(googleData, current);
  const tbr = useSelector((state) => state.user.books.tbr);
  const tbrGoogleData = getShelfGoogleData(googleData, tbr);
  const favorites = useSelector((state) => state.user.books.favorites);
  const favoritesGoogleData = getShelfGoogleData(googleData, favorites);

  return (
    <div className="dashboard-shelves-container">
      <p className="dashboard-shelves-title">Shelves</p>
      <div className="dashboard-shelves">
        <div className="dashboard-shelf shadow color-6">
          <p className="dashboard-shelf-title">TBR</p>
          <div className="dashboard-shelf-books">
            {tbrGoogleData?.map((book) => {
              return (
                <a
                  className="dashboard-shelf-book-card grow"
                  href={`/book/${book.id}`}
                  key={book.id}
                >
                  <img
                    key={book.volumeInfo.imageLinks.thumbnail}
                    src={book.volumeInfo.imageLinks.thumbnail}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="dashboard-shelf shadow color-5">
          <p className="dashboard-shelf-title">Favorites</p>
          <div className="dashboard-shelf-books">
            {favoritesGoogleData?.map((book) => {
              return (
                <a
                  className="dashboard-shelf-book-card grow"
                  href={`/book/${book.id}`}
                  key={book.id}
                >
                  <img
                    key={book.volumeInfo.imageLinks.thumbnail}
                    src={book.volumeInfo.imageLinks.thumbnail}
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="dashboard-shelf color-4 shadow">
          <p className="dashboard-shelf-title">Current</p>
          <div className="dashboard-shelf-books">
            {currentGoogleData?.map((book) => {
              return (
                <a
                  className="dashboard-shelf-book-card grow"
                  href={`/book/${book.id}`}
                  key={book.id}
                >
                  <img
                    key={book.volumeInfo.imageLinks.thumbnail}
                    src={book.volumeInfo.imageLinks.thumbnail}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
