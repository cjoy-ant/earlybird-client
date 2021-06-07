import React from "react";

export default React.createContext({
  books: [],
  entries: [],
  reviews: [],
  addBook: () => {},
  editBook: () => {},
  deleteBook: () => {},
  addEntry: () => {},
  editEntry: () => {},
  deleteEntry: () => {},
  addReview: () => {},
  editReview: () => {},
  deleteReview: () => {},
});
