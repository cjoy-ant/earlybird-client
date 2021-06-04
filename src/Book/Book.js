import React from "react";
import { Link } from "react-router-dom";

export default class Book extends React.Component {
  render() {
    const {
      book_id,
      book_title,
      book_author,
      book_genre,
      book_date_started,
      book_finished,
    } = this.props;

    const bookFinished = () => {
      if (book_finished) {
        return "Yes";
      }
      return "Not yet";
    };

    return (
      <div className="Book">
        <h3>
          <Link to={`/books/${book_id}`}>{book_title}</Link>
        </h3>
        <p>
          by {book_author}
          <br />
          <span className="italic">{book_genre}</span>
          <br />
          <br />
          <span className="bold">Date Started:</span> {book_date_started}
          <br />
          <span className="bold">Book Finished:</span> {bookFinished()}
        </p>
      </div>
    );
  }
}
