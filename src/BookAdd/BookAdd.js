import React from "react";
import Context from "../Context";
import { v4 as uuidv4 } from "uuid";
import "./BookAdd.css";

export default class BookAdd extends React.Component {
  state = {
    book_title: "",
    book_author: "",
    book_genre: "",
    book_date_started: "",
  };

  static contextType = Context;

  handleChangeTitle = (e) => {
    this.setState({ book_title: e.target.value });
  };

  handleChangeAuthor = (e) => {
    this.setState({ book_author: e.target.value });
  };

  handleChangeGenre = (e) => {
    this.setState({ book_genre: e.target.value });
  };

  handleChangeDateStarted = (e) => {
    this.setState({ book_date_started: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      book_id: uuidv4(),
      book_title: this.state.book_title,
      book_author: this.state.book_author,
      book_genre: this.state.book_genre,
      book_date_started: this.state.book_date_started,
      book_finished: false,
      book_date_modified: new Date().toISOString().substring(0, 10),
    };

    this.context.addBook(newBook);
    this.props.history.push(`/books/${newBook.book_id}`);
  };

  handleClickCancel = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <div className="BookAdd">
        <h2>Add a Book</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="book-title">Title:</label>
          <input
            id="book-title"
            type="text"
            aria-label="title"
            onChange={this.handleChangeTitle}
            required
          />
          <br />
          <label htmlFor="book-author">Author:</label>
          <input
            id="book-author"
            type="text"
            aria-label="author"
            onChange={this.handleChangeAuthor}
            required
          ></input>
          <br />
          <label htmlFor="book-genre">Genre:</label>
          <input
            id="book-genre"
            type="text"
            aria-label="genre"
            onChange={this.handleChangeGenre}
            required
          ></input>
          <br />
          <label htmlFor="book-date-started">Date Started:</label>
          <input
            id="book-date-started"
            type="date"
            aria-label="date"
            onChange={this.handleChangeDateStarted}
            required
          ></input>
          <br />
          <div className="BookAdd__button-container">
            <button
              type="button"
              id="BookAdd__button-cancel"
              aria-label="cancel"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button type="submit" id="BookAdd__button-submit" aria-label="save">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
