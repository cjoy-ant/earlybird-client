import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import Context from "../Context";
import "./BookPage.css";

export default class BookPage extends React.Component {
  state = {
    book_id: "",
    book_title: "",
    book_author: "",
    book_genre: "",
    book_date_started: "",
    book_finished: "",
    book_date_modified: "",
  };

  static contextType = Context;

  componentDidMount() {
    const { book_id } = this.props.match.params;
    const findBook = (books, book_id) =>
      books.find((book) => book.book_id === book_id);
    const book = findBook(this.context.books, book_id);

    this.setState({
      book_id: book.book_id,
      book_title: book.book_title,
      book_author: book.book_author,
      book_genre: book.book_genre,
      book_date_started: book.book_date_started,
      book_finished: book.book_finished,
      book_date_modified: book.book_date_modified,
    });
  }

  handleClickDelete = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to remove this book?\nClick OK to remove."
      )
    ) {
      this.context.deleteBook(this.state.book_id);
      this.props.history.push("/books");
    }
  };

  render() {
    const {
      book_id,
      book_title,
      book_author,
      book_genre,
      book_date_started,
      book_finished,
      book_date_modified,
    } = this.state;

    return (
      <>
        <div className="BookPage">
          <Book
            book_id={book_id}
            book_title={book_title}
            book_author={book_author}
            book_genre={book_genre}
            book_date_started={book_date_started}
            book_finished={book_finished}
            book_date_modified={book_date_modified}
          />
          <div className="BookPage__button-container">
            <Link to={`/edit-book/${book_id}`}>
              <button type="button" id="BookPage__edit" aria-label="edit">
                Edit
              </button>
            </Link>
            <button
              type="button"
              id="BookPage__delete"
              aria-label="delete"
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
            <br />
            <button type="button" id="BookPage__finished">
              Mark as Finished
            </button>
          </div>
        </div>
        <div className="BookPage__button-container-move">
          <button type="button" id="BookPage__previous" aria-label="previous">
            Previous
          </button>

          <button type="button" id="BookPage__next" aria-label="next">
            Next
          </button>
        </div>
      </>
    );
  }
}
