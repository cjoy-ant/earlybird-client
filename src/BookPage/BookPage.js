import React from "react";
import Book from "../Book/Book";
import "./BookPage.css";

export default class BookPage extends React.Component {
  render() {
    const {
      book_id,
      book_title,
      book_author,
      book_genre,
      book_date_started,
      book_finished,
      book_date_modified,
    } = this.props;

    return (
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
        <div class="BookPage__button-container">
          <button type="button" id="BookPage__edit" aria-label="edit">
            Edit
          </button>
          <button type="button" id="BookPage__delete" aria-label="delete">
            Delete
          </button>
          <button type="button" id="BookPage__finished">
            Mark as Finished
          </button>
        </div>
        <div class="BookPage__button-container-move">
          <button type="button" id="BookPage__previous" aria-label="previous">
            Previous
          </button>
          <button type="button" id="BookPage__next" aria-label="next">
            Next
          </button>
        </div>
      </div>
    );
  }
}
