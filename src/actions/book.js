const bookOnShelf = (id, shelf) => {
  if (shelf !== undefined) {
    let filtered = shelf.filter((book) => book.id === id);
    return filtered.length > 0 ? true : false;
  }
};
const findCurrentBook = (id, shelf) => {
  if (shelf !== undefined) {
    let filtered = shelf.filter((book) => book.id === id)[0];
    return filtered;
  }
};

export { bookOnShelf, findCurrentBook };
