import React from "react";
import Context from "../Context";
import config from "../config";
import STORE from "../STORE";
import PropTypes from "prop-types";
import "./EntryAdd.css";

export default class EntryAdd extends React.Component {
  state = {
    error: null,
    entry_title: "",
    entry_book_id: "",
    entry_category: "",
    entry_chapters: "",
    entry_pages: "",
    entry_quote: "",
    entry_notes: "",
  };

  static contextType = Context;

  handleChangeTitle = (e) => {
    this.setState({ entry_title: e.target.value });
  };

  handleChangeBook = (e) => {
    this.setState({ entry_book_id: e.target.value });
  };

  handleChangeCategory = (e) => {
    this.setState({ entry_category: e.target.value });
  };

  handleChangeChapters = (e) => {
    this.setState({ entry_chapters: e.target.value });
  };

  handleChangePages = (e) => {
    this.setState({ entry_pages: e.target.value });
  };

  handleChangeQuote = (e) => {
    this.setState({ entry_quote: e.target.value });
  };

  handleChangeNotes = (e) => {
    this.setState({
      entry_notes: e.target.value,
    });
  };

  handleSubmit = () => {
    const newEntry = {
      entry_book_id: this.state.entry_book_id,
      entry_title: this.state.entry_title,
      entry_category: this.state.entry_category,
      entry_chapters: this.state.entry_chapters,
      entry_pages: this.state.entry_pages,
      entry_quote: this.state.entry_quote,
      entry_notes: this.state.entry_notes,
    };

    fetch(`${config.API_ENDPOINT}/entries`, {
      method: "POST",
      body: JSON.stringify(newEntry),
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
        this.context.addEntry(newEntry);
        this.props.history.push(`/entries`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/entries/");
  };

  makeBookDropDownList = () => {
    const bookDropDownList = this.context.books.map((book) => {
      return (
        <option key={book.book_id} value={book.book_id}>
          {book.book_title}
        </option>
      );
    });
    return bookDropDownList;
  };

  validateBook = (e) => {
    e.preventDefault();

    if (this.state.entry_book_id === "") {
      alert("Please select a book");
    } else {
      this.validateCategory();
    }
  };

  makeCategoriesList = () => {
    const categories = STORE.categories.map((category) => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
    return categories;
  };

  validateCategory = () => {
    if (this.state.entry_category === "0") {
      alert(`Select a category for this entry.`);
    } else {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="EntryAdd">
        <h2>Add an entry</h2>
        <form onSubmit={this.validateBook}>
          <label htmlFor="entry-title">Title:</label>
          <input
            id="entry-title"
            type="text"
            aria-label="title"
            placeholder="Give your entry a title..."
            onChange={this.handleChangeTitle}
            required
          />
          <br />
          <label htmlFor="entry_book_id_list">Book:</label>
          <select
            id="entry_book_id__list"
            aria-label="book"
            onChange={this.handleChangeBook}
          >
            <option key="0" value="">
              Select a book...
            </option>
            {this.makeBookDropDownList()}
          </select>
          <br />

          <label htmlFor="entry-category">Category:</label>
          <select
            id="entry-category"
            aria-label="category"
            onChange={this.handleChangeCategory}
          >
            <option key="0" value="0">
              Categorize this entry...
            </option>
            {this.makeCategoriesList()}
          </select>
          <br />
          <label htmlFor="entry-chapters">Chapters:</label>
          <input
            id="entry-chapters"
            type="text"
            aria-label="chapters"
            onChange={this.handleChangeChapters}
          />
          <br />
          <label htmlFor="entry-pages">Pages:</label>
          <input
            id="entry-pages"
            type="text"
            aria-label="pages"
            onChange={this.handleChangePages}
          />
          <br />
          <label htmlFor="entry-quote">Quote:</label>
          <br />
          <textarea
            id="entry-quote"
            type="text"
            onChange={this.handleChangeQuote}
          ></textarea>
          <br />
          <label htmlFor="entry-notes">Notes:</label>
          <br />
          <textarea
            id="entry-notes"
            type="text"
            onChange={this.handleChangeNotes}
          ></textarea>
          <br />

          <div className="EntryAdd__button-container">
            <button
              type="button"
              id="EntryAdd__button-cancel"
              aria-label="cancel"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="EntryAdd__button-submit"
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

EntryAdd.defaultProps = {
  history: {
    push: () => {},
  },
};

EntryAdd.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
