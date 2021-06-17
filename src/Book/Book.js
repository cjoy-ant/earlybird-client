import React from "react";
// import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import PropTypes from "prop-types";
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
          {book_author}
          <br />
          <span className="italic">{book_genre}</span>
          <br />
          <br />
          <span className="bold">When I started:</span>{" "}
          {/* {format(utcToZonedTime(book_date_started), "MMMM d, yyyy")} */}
          {book_date_started.substr(0, 10)}
          <br />
          <span className="bold">Am I finished?</span> {bookFinished()}
        </p>
      </div>
    );
  }
}

Book.defaultProps = {
  book_id: "",
  book_title: "",
  book_author: "",
  book_genre: "",
  book_date_started: "",
  book_finished: false,
};

Book.propTypes = {
  book_id: PropTypes.string.isRequired,
  book_title: PropTypes.string.isRequired,
  book_author: PropTypes.string.isRequired,
  book_genre: PropTypes.string.isRequired,
  book_date_started: PropTypes.string.isRequired,
  book_finished: PropTypes.bool.isRequired,
};
