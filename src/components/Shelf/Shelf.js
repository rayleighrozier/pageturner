import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getShelfGoogleData } from "../../actions/googleBooks";
import "./Shelf.css";

export default function Shelf() {
  const { shelf } = useParams();
  const googleData = useSelector((state) => state.user.googleData);
  const shelfBooks = useSelector((state) => state.user.books[shelf]);
  const shelfGoogleData = getShelfGoogleData(googleData, shelfBooks);

  return (
    <div className="shelf color-4">
      <p className="shelf-title">{shelf}</p>
      {shelfGoogleData?.map((book) => {
        return (
          <div className="shelf-card white shadow">
            <a href={`/book/${book.id}`} key={book.id}>
              <img
                className="shelf-pic"
                key={book.volumeInfo.imageLinks.thumbnail}
                src={book.volumeInfo.imageLinks.thumbnail}
              />
              <p>{book.volumeInfo.title}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
}
