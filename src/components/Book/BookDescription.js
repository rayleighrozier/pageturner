import React from "react";
import { useSelector } from "react-redux";

export default function BookDescription() {
  const currentBook = useSelector((state) => state.currentBook);
  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  };
  const description = removeTags(currentBook?.volumeInfo?.description);
  return <div>{description}</div>;
}
