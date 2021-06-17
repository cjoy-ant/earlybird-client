import React from "react";
import Context from "../Context";
import config from "../config";
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
    const { book_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/books/${book_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          book_id: res.book_id,
          book_title: res.book_title,
          book_author: res.book_author,
          book_genre: res.book_genre,
          book_date_started: res.book_date_started,
          book_finished: res.book_finished,
          book_date_modified: res.book_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
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

  handleSubmit = (e) => {
    e.preventDefault();
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

  render() {
    const { book_title, book_author, book_genre, book_date_started } =
      this.state;

    return (
      <div className="BookEdit">
        <h2>
          Edit <span className="bold italic">'{book_title}'</span>
        </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="book-title">Title:</label>
          <input
            id="book-title"
            type="text"
            aria-label="title"
            defaultValue={book_title}
            onChange={this.handleChangeTitle}
          />
          <br />
          <label htmlFor="book-author">Author:</label>
          <input
            id="book-author"
            type="text"
            aria-label="author"
            defaultValue={book_author}
            onChange={this.handleChangeAuthor}
          ></input>
          <br />
          <label htmlFor="book-genre">Genre:</label>
          <input
            id="book-genre"
            type="text"
            aria-label="genre"
            defaultValue={book_genre}
            onChange={this.handleChangeGenre}
          ></input>
          <br />
          <label htmlFor="book-date-started">Date Started:</label>
          <input
            id="book-date-started"
            type="date"
            aria-label="date"
            defaultValue={book_date_started.substr(0, 10)}
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
