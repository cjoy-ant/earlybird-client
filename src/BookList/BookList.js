import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import Context from "../Context";
import "./BookList.css";

export default class BookList extends React.Component {
  static contextType = Context;

  makeBookList = () => {
    const sorted = this.context.books.sort((a, b) => {
      return b.book_date_started - a.book_date_started;
    });

    const bookList = sorted.map((book) => {
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
