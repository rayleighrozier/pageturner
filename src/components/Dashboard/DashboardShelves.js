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
        <div className="dashboard-shelf color-6">
          <a href="/shelf/tbr">TBR</a>
          {tbrGoogleData?.map((book) => {
            return (
              <a href={`/book/${book.id}`} key={book.id}>
                <img
                  key={book.volumeInfo.imageLinks.thumbnail}
                  src={book.volumeInfo.imageLinks.thumbnail}
                />
              </a>
            );
          })}
        </div>
        <div className="dashboard-shelf color-3">
          <a href="/shelf/favorites">Favorites</a>
          {favoritesGoogleData?.map((book) => {
            return (
              <a href={`/book/${book.id}`} key={book.id}>
                <img
                  key={book.volumeInfo.imageLinks.thumbnail}
                  src={book.volumeInfo.imageLinks.thumbnail}
                />
              </a>
            );
          })}
        </div>
        <div className="dashboard-shelf color-5">
          <a href="/shelf/current">Current</a>
          {currentGoogleData?.map((book) => {
            return (
              <a href={`/book/${book.id}`} key={book.id}>
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
  );
}
