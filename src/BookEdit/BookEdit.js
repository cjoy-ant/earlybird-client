import React from "react";
import Context from "../Context";
import config from "../config";
import STORE from "../STORE";
import "./BookEdit.css";

export default class BookEdit extends React.Component {
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
    const { books } = this.context;
    const { book_id } = this.props.match.params;
    const findBook = (books, book_id) =>
      books.find((book) => book.book_id === book_id);
    const book = findBook(books, book_id);

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

  handleSubmit = () => {
    const { book_id } = this.props.match.params;

    const updatedBook = {
      book_id: this.state.book_id,
      book_title: this.state.book_title,
      book_author: this.state.book_author,
      book_genre: this.state.book_genre,
      book_date_started: this.state.book_date_started,
      book_finished: this.state.book_finished,
    };

    fetch(`${config.API_ENDPOINT}/books/${book_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedBook),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
      })
      .then((res) => {
        this.context.editBook(updatedBook);
        this.props.history.push(`/books/${updatedBook.book_id}`);
      })
      .catch((error) => {
        console.error(error);
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
    const { books } = this.context;
    const { book_id } = this.props.match.params;
    const findBook = (books, book_id) =>
      books.find((book) => book.book_id === book_id);
    const book = findBook(books, book_id);

    return (
      <div className="BookEdit">
        <h2>
          Edit <span className="bold italic">'{book.book_title}'</span>
        </h2>
        <form onSubmit={this.validateGenre}>
          <label htmlFor="book-title">Title:</label>
          <input
            id="book-title"
            type="text"
            aria-label="title"
            defaultValue={book.book_title}
            onChange={this.handleChangeTitle}
          />
          <br />
          <label htmlFor="book-author">Author:</label>
          <input
            id="book-author"
            type="text"
            aria-label="author"
            defaultValue={book.book_author}
            onChange={this.handleChangeAuthor}
          ></input>
          <br />
          <label htmlFor="book-genre">Genre:</label>
          <select
            id="book-genre"
            aria-label="genre"
            defaultValue={book.book_genre}
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
            defaultValue={book.book_date_started}
            onChange={this.handleChangeDateStarted}
          ></input>
          <br />
          <div className="BookEdit__button-container">
            <button
              type="button"
              id="BookEdit__button-cancel"
              aria-label="cancel"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="BookEdit__button-submit"
              aria-label="save"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
