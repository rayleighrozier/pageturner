const googleBooksKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

//unfinished
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

export { searchBooks, getSingleBook };
