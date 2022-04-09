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
      {currentGoogleData.map((book) => {
        return (
          <div>
            <img src={book.volumeInfo.imageLinks.thumbnail} />
            <p>{book.volumeInfo.title}</p>
          </div>
        );
      })}
    </div>
  );
}
