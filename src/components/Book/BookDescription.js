import React from "react";
import { useSelector } from "react-redux";
import { removeTags } from "../../actions/format";

export default function BookDescription() {
  const currentBook = useSelector((state) => state.currentBook);
  const description = removeTags(currentBook?.volumeInfo?.description);
  return (
    <div className="book-description color-6 shadow">
      <p>{description}</p>
    </div>
  );
}
