import React from "react";
import { useSelector } from "react-redux";

export default function DashboardTop() {
  let googleData = useSelector((state) => state.user.googleData);
  let currentBooks = useSelector((state) => state.user.books.current);
  console.log("currentBooks", currentBooks);
  //func breaking rn, left off here
  const getCurrentGoogleData = () => {
    let currentGoogleData = [];
    for (const book of currentBooks) {
      let bookData = googleData.filter((googleBook) => googleBook.id !== book);
      currentGoogleData = [...currentGoogleData, bookData];
      return currentGoogleData;
    }
  };
  // const currentGoogleData = getCurrentGoogleData();
  // console.log("current gd", currentGoogleData[0]);
  return (
    <div>
      <p>Current Reads</p>
    </div>
  );
}
