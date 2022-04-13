import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getShelfGoogleData } from "../../actions/googleBooks";

export default function Shelf() {
  const { shelf } = useParams();
  const googleData = useSelector((state) => state.user.googleData);
  const shelfBooks = useSelector((state) => state.user.books[shelf]);
  let shelfGoogleData = getShelfGoogleData(googleData, shelfBooks);
  console.log("shelfGoogleData", shelfGoogleData);
  return (
    <div>
      <p>{shelf.toUpperCase()}</p>
      {shelfGoogleData?.map((book) => {
        return (
          <a href={`/book/${book.id}`} key={book.id}>
            <img
              key={book.volumeInfo.imageLinks.thumbnail}
              src={book.volumeInfo.imageLinks.thumbnail}
            />
            <p>{book.volumeInfo.title}</p>
          </a>
        );
      })}
    </div>
  );
}
