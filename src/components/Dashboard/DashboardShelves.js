import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getShelfGoogleData } from "../../actions/googleBooks";

export default function DashboardShelves() {
  const googleData = useSelector((state) => state.user.googleData);
  const books = useSelector((state) => state.user.books);
  const current = useSelector((state) => state.user.books.current);
  let currentGoogleData = getShelfGoogleData(googleData, current);
  const tbr = useSelector((state) => state.user.books.tbr);
  let tbrGoogleData = getShelfGoogleData(googleData, tbr);
  const favorites = useSelector((state) => state.user.books.favorites);
  let favoritesGoogleData = getShelfGoogleData(googleData, favorites);

  return (
    <div>
      <p>Shelves</p>
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
  );
}
