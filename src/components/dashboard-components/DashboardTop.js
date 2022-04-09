import React from "react";
import { useSelector } from "react-redux";

export default function DashboardTop() {
  let googleData = useSelector((state) => state.user.googleData);
  let current = useSelector((state) => state.user.books.current);
  console.log("currentBooks", current);
  //func breaking rn, left off here

  const getShelfGoogleData = (shelf) => {
    let dataArray = [];
    for (const book of shelf) {
      let bookData = googleData.filter((googleBook) => googleBook.id !== book);
      dataArray = [...dataArray, ...bookData];
      return dataArray;
    }
  };
  let currentGoogleData = getShelfGoogleData(current);
  console.log("current gd", currentGoogleData[0].volumeInfo.title);
  // const currentGoogleData = getCurrentGoogleData();
  // console.log("current gd", currentGoogleData[0]);
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
