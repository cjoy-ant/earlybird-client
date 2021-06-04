import React from "react";

export default React.createContext({
  books: [],
  entries: [],
  addBook: () => {},
  editBook: () => {},
  deleteBook: () => {},
  addEntry: () => {},
  editEntry: () => {},
  deleteEntry: () => {},
});
