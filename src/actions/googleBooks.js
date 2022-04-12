const googleBooksKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

const searchBooks = async (q) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleBooksKey}`;
  let data = await fetch(url);
  let json = await data.json();
  console.log(json.items[0]);
};

const getSingleBook = async (id) => {
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${googleBooksKey}`;
  let data = await fetch(url);
  let json = await data.json();
  return json;
};

// FIX THIS -- book is not iterating as intended
const getShelfGoogleData = (googleData, shelf) => {
  let dataArray = [];
  for (let book of shelf) {
    let bookData = googleData.filter((googleBook) => googleBook.id === book.id);
    dataArray = [...dataArray, ...bookData];
  }
  return dataArray;
};

const getSearchResults = async (q) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${googleBooksKey}`;
  let data = await fetch(url);
  let json = await data.json();
  return json;
};

export { searchBooks, getSingleBook, getShelfGoogleData, getSearchResults };
