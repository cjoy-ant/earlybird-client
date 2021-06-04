import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
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
      const book = this.context.books.filter(
        (book) => book.book_id === entry_book_id
      );
      return book[0].book_title;
    };

    const isChapters = () => {
      if (entry_chapters === "") {
        return;
      } else {
        return (
          <>
            <span className="bold small">Chapter:</span> {entry_chapters}
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
            <span className="bold small">Page:</span> {entry_pages}
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
          <span className="large bold">{findBook()}</span> |{" "}
          <span className="italic">{entry_category}</span>
          <br />
          {isChapters()}
          {isPages()}
          <br />
          {isQuote()}
          {isNotes()}
          <br />
          <br />
          <span className="bold small">Last updated:</span>{" "}
          {entry_date_modified}
        </p>
      </div>
    );
  }
}
