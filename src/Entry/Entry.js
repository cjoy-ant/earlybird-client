import React from "react";
import STORE from "../STORE";
import "./Entry.css";

export default class Entry extends React.Component {
  render() {
    const {
      entry_book_id,
      entry_title,
      entry_category,
      entry_chapters,
      entry_pages,
      entry_content,
      entry_date_modified,
    } = this.props;

    const findBook = () => {
      const book = STORE.books.filter((book) => book.book_id === entry_book_id);
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

    return (
      <div className="Entry">
        <h3>{entry_title}</h3>
        <p>
          <span className="large bold">{findBook()}</span> |{" "}
          <span className="italic">{entry_category}</span>
          <br />
          {isChapters()}
          {isPages()}
          <br />
          <span className="bold">Your notes:</span>
          <br />
          {entry_content}
          <br />
          <br />
          <span className="bold small">Last updated:</span>{" "}
          {entry_date_modified}
        </p>
      </div>
    );
  }
}
