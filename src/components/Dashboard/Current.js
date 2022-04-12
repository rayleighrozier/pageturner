import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getShelfGoogleData, getSingleBook } from "../../actions/googleBooks";

export default function DashboardTop() {
  const googleData = useSelector((state) => state.user.googleData);
  const current = useSelector((state) => state.user.books.current);
  let currentGoogleData = getShelfGoogleData(googleData, current);
  console.log(currentGoogleData);
  return (
    <div>
      <p>Pick up where you left off!</p>
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
