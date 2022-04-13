const bookOnShelf = (bookId, shelf) => {
  if (shelf !== undefined) {
    let filtered = shelf.filter((book) => book.id === bookId);
    return filtered.length > 0 ? true : false;
  }
};
const findIndexOfBook = (bookId, shelf) => {
  let index = shelf.findIndex((book) => book.id === bookId);
  return index;
};

const getPagesRead = (bookId, shelf) => {
  if (bookOnShelf(bookId, shelf)) {
    let index = findIndexOfBook(bookId, shelf);
    let pages = shelf[index].pagesRead;
    return pages;
  }
};

export { bookOnShelf, findIndexOfBook, getPagesRead };
