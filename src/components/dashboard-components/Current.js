import React from "react";
import { useSelector } from "react-redux";
import { getShelfGoogleData } from "../../actions/googleBooks";

export default function DashboardTop() {
  const googleData = useSelector((state) => state.user.googleData);
  const current = useSelector((state) => state.user.books.current);
  let currentGoogleData = getShelfGoogleData(googleData, current);

  return (
    <div>
      <p>Current Reads</p>
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
