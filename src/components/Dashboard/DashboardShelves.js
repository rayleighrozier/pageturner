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
      <p>TBR</p>
      {tbrGoogleData?.map((book) => {
        return (
          <a href={`/book/${book.id}`} key={book.id}>
            <img
              key={book.volumeInfo.imageLinks.thumbnail}
              src={book.volumeInfo.imageLinks.thumbnail}
            />
            <p key={book.volumeInfo.title}>{book.volumeInfo.title}</p>
          </a>
        );
      })}
      <p>Favorites</p>
      {favoritesGoogleData?.map((book) => {
        return (
          <a href={`/book/${book.id}`} key={book.id}>
            <img
              key={book.volumeInfo.imageLinks.thumbnail}
              src={book.volumeInfo.imageLinks.thumbnail}
            />
            <p key={book.volumeInfo.title}>{book.volumeInfo.title}</p>
          </a>
        );
      })}
      <p>Current</p>
      {currentGoogleData?.map((book) => {
        return (
          <a href={`/book/${book.id}`} key={book.id}>
            <img
              key={book.volumeInfo.imageLinks.thumbnail}
              src={book.volumeInfo.imageLinks.thumbnail}
            />
            <p key={book.volumeInfo.title}>{book.volumeInfo.title}</p>
          </a>
        );
      })}
    </div>
  );
}
