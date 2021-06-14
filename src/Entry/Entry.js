import React from "react";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import Context from "../Context";
import "./Entry.css";

export default class Entry extends React.Component {
  static contextType = Context;

  // state = {
  //   book_title: "",
  // };

  // componentDidMount() {
  //   const findBook = () => {
  //     const book = this.context.books.find(
  //       (book) => book.book_id === this.props.entry_book_id
  //     );
  //     console.log(book.book_title);
  //     return book.book_title;
  //   };

  //   this.setState({
  //     book_title: findBook(),
  //   });
  // }

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
      // console.log(entry_book_id);
      // console.log(book);
      // console.log(book.book_id);
      // console.log(book.book_title); //just for debugging
      // return book.book_title; //keeps erroring on EntryPage "cannot read property book_title of undefined"
    };

    const isChapters = () => {
      if (entry_chapters === "") {
        return;
      } else {
        return (
          <>
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
          <br />
          {isNotes()}
          <br />
          <br />
          <span className="bold small">Last updated:</span>{" "}
          <span className="small">
            {/* {format(utcToZonedTime(entry_date_modified), "MMMM d, yyyy")} */}
            {entry_date_modified.substring(0, 10)}
          </span>
        </p>
      </div>
    );
  }
}
