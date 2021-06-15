import React from "react";
import config from "../config";
import Context from "../Context";
import STORE from "../STORE";
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
    const date = new Date(e.target.value);
    this.setState({ book_date_started: date });
  };

  handleSubmit = () => {
    const newBook = {
      book_title: this.state.book_title,
      book_author: this.state.book_author,
      book_genre: this.state.book_genre,
      book_date_started: this.state.book_date_started,
    };

    fetch(`${config.API_ENDPOINT}/books`, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Something went wrong`);
        }
        return res.json();
      })
      .then((res) => {
        this.context.addBook(newBook);
        this.props.history.push(`/books`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/books");
  };

  makeGenresList = () => {
    const genres = STORE.genres.map((genre) => {
      return (
        <option key={genre} value={genre}>
          {genre}
        </option>
      );
    });
    return genres;
  };

  validateGenre = (e) => {
    e.preventDefault();
    if (this.state.book_genre === "0") {
      alert(`Select a genre`);
    } else {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="BookAdd">
        <h2>Add a Book</h2>
        <form onSubmit={this.validateGenre}>
          <label htmlFor="book-title">Title:</label>
          <input
            id="book-title"
            type="text"
            aria-label="title"
            placeholder="Title"
            onChange={this.handleChangeTitle}
            required
          />
          <br />
          <label htmlFor="book-author">Author:</label>
          <input
            id="book-author"
            type="text"
            aria-label="author"
            placeholder="First and Last Name"
            onChange={this.handleChangeAuthor}
            required
          ></input>
          <br />
          <label htmlFor="book-genre">Genre:</label>
          <select
            id="book-genre"
            aria-label="genre"
            onChange={this.handleChangeGenre}
          >
            <option key="0" value="0">
              Select a genre...
            </option>
            {this.makeGenresList()}
          </select>
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
