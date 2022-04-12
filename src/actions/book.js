const bookOnShelf = (id, shelf) => {
  if (shelf !== undefined) {
    let filtered = shelf.filter((book) => book.id === id);
    return filtered.length > 0 ? true : false;
  }
};

export { bookOnShelf };
