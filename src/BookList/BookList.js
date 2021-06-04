import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import STORE from "../STORE";
import "./BookList.css";

export default class BookList extends React.Component {
  makeBookList = () => {
    const bookList = STORE.books.map((book) => {
      return (
        <li key={book.book_id}>
          <Book
            book_id={book.book_id}
            book_title={book.book_title}
            book_author={book.book_author}
            book_genre={book.book_genre}
            book_date_started={book.book_date_started}
            book_finished={book.book_finished}
            book_date_modified={book.book_date_modified}
          />
        </li>
      );
    });
    return bookList;
  };

  render() {
    return (
      <div className="BookList">
        <h2>Books</h2>
        <div className="BookList__button-container">
          <Link to="/add-book">
            <button className="BookList__button-add">Add a book</button>
          </Link>
        </div>
        <ul>{this.makeBookList()}</ul>
      </div>
    );
  }
}
