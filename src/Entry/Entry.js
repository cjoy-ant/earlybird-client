import React from "react";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import Context from "../Context";
import PropTypes from "prop-types";
import "./Entry.css";

export default class Entry extends React.Component {
  static contextType = Context;

  render() {
    const {
      entry_id,
      entry_book_id,
      entry_title,
      entry_category,
      entry_chapters,
      entry_pages,
      entry_quote,
      entry_notes,
      entry_date_modified,
    } = this.props;

    const findBook = () => {
      const book = this.context.books.find(
        (book) => book.book_id === entry_book_id
      );
      if (book) {
        return book.book_title;
      } else return;
    };

    const isChapters = () => {
      if (entry_chapters === "") {
        return;
      } else {
        return (
          <>
            <br />
            <span className="bold small">Chapter:</span>{" "}
            <span className="small">{entry_chapters}</span>
            <br />
          </>
        );
      }
    };

    const isPages = () => {
      if (entry_pages === "") {
        return;
      } else {
        return (
          <>
            <br />
            <span className="bold small">Page:</span>{" "}
            <span className="small">{entry_pages}</span>
            <br />
          </>
        );
      }
    };

    const isQuote = () => {
      if (entry_quote === "") {
        return;
      } else {
        return (
          <>
            <br />
            <span className="bold">Quote:</span> {entry_quote}
            <br />
          </>
        );
      }
    };

    const isNotes = () => {
      if (entry_notes === "") {
        return;
      } else {
        return (
          <>
            <br />
            <span className="bold">Notes:</span> {entry_notes}
            <br />
          </>
        );
      }
    };

    return (
      <div className="Entry">
        <h3>
          <Link to={`/entries/${entry_id}`}>{entry_title}</Link>
        </h3>
        <p>
          <span className="large bold">
            <Link to={`/books/${entry_book_id}`}>{findBook()}</Link>
          </span>{" "}
          | <span className="italic">{entry_category}</span>
          <br />
          {isChapters()}
          {isPages()}
          {isQuote()}
          {isNotes()}
          <br />
          <span className="bold small">Last updated:</span>{" "}
          <span className="small">
            {/* {format(utcToZonedTime(date), "MMMM d, yyyy")} */}
            {entry_date_modified.substr(0, 10)}
          </span>
        </p>
      </div>
    );
  }
}

Entry.defaultProps = {
  entry_id: "",
  entry_book_id: "",
  entry_title: "",
  entry_category: "",
  entry_chapters: "",
  entry_pages: "",
  entry_quote: "",
  entry_notes: "",
  entry_date_modified: "",
};

Entry.propTypes = {
  entry_id: PropTypes.string.isRequired,
  entry_book_id: PropTypes.string.isRequired,
  entry_title: PropTypes.string.isRequired,
  entry_category: PropTypes.string.isRequired,
  entry_chapters: PropTypes.string.isRequired,
  entry_pages: PropTypes.string.isRequired,
  entry_quote: PropTypes.string.isRequired,
  entry_notes: PropTypes.string.isRequired,
  entry_date_modified: PropTypes.string.isRequired,
};
