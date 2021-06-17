import React from "react";
import Context from "../Context";
import config from "../config";
import STORE from "../STORE";
import PropTypes from "prop-types";
import "./EntryEdit.css";

export default class EntryEdit extends React.Component {
  state = {
    error: null,
    entry_id: "",
    entry_title: "",
    entry_book_id: "",
    entry_category: "",
    entry_chapters: "",
    entry_pages: "",
    entry_content: "",
    entry_quote: "",
    entry_notes: "",
    entry_date_modified: "",
  };

  static contextType = Context;

  componentDidMount() {
    const { entry_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/entries/${entry_id}`, {
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
          entry_id: res.entry_id,
          entry_title: res.entry_title,
          entry_book_id: res.entry_book_id,
          entry_category: res.entry_category,
          entry_chapters: res.entry_category,
          entry_pages: res.entry_pages,
          entry_quote: res.entry_quote,
          entry_notes: res.entry_notes,
          entry_date_modified: res.entry_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

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

  validateBook = (e) => {
    e.preventDefault();

    if (this.state.entry_book_id === "") {
      alert("Please select a book");
    } else {
      this.validateCategory();
    }
  };

  handleSubmit = () => {
    const { entry_id } = this.props.match.params;

    const updatedEntry = {
      entry_id: this.state.entry_id,
      entry_book_id: this.state.entry_book_id,
      entry_title: this.state.entry_title,
      entry_category: this.state.entry_category,
      entry_chapters: this.state.entry_chapters,
      entry_pages: this.state.entry_pages,
      entry_quote: this.state.entry_quote,
      entry_notes: this.state.entry_notes,
    };

    fetch(`${config.API_ENDPOINT}/entries/${entry_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedEntry),
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
        this.context.editEntry(updatedEntry);
        this.props.history.push(`/entries/${updatedEntry.entry_id}`);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    const { entry_id } = this.props.match.params;
    this.props.history.push(`/entries/${entry_id}`);
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
    // const { entries } = this.context;
    // const { entry_id } = this.props.match.params;
    // const findEntry = (entries, entry_id) =>
    //   entries.find((entry) => entry.entry_id === entry_id);
    // const entry = findEntry(entries, entry_id);

    const {
      entry_title,
      entry_book_id,
      entry_category,
      entry_chapters,
      entry_pages,
      entry_quote,
      entry_notes,
    } = this.state;

    return (
      <div className="EntryEdit">
        <h2>
          Edit <span className="bold italic">'{entry_title}'</span>
        </h2>
        <form onSubmit={this.validateBook}>
          <label htmlFor="entry-title">Title:</label>
          <input
            id="entry-title"
            type="text"
            aria-label="title"
            defaultValue={entry_title}
            placeholder="Give your entry a title..."
            onChange={this.handleChangeTitle}
          />
          <br />

          <label htmlFor="entry_book_id_list">Book:</label>
          <select
            id="entry_book_id__list"
            aria-label="book"
            defaultValue={entry_book_id}
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
            defaultValue={entry_category}
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
            defaultValue={entry_chapters}
            onChange={this.handleChangeChapters}
          />
          <br />

          <label htmlFor="entry-pages">Pages:</label>
          <input
            id="entry-pages"
            type="text"
            aria-label="pages"
            defaultValue={entry_pages}
            onChange={this.handleChangePages}
          />
          <br />

          <label htmlFor="entry-quote">Quote:</label>
          <br />
          <textarea
            id="entry-quote"
            type="text"
            defaultValue={entry_quote}
            onChange={this.handleChangeQuote}
          ></textarea>
          <br />

          <label htmlFor="entry-notes">Notes:</label>
          <br />
          <textarea
            id="entry-notes"
            type="text"
            aria-label="notes"
            defaultValue={entry_notes}
            onChange={this.handleChangeNotes}
          ></textarea>
          <br />

          <div className="EntryEdit__button-container">
            <button
              type="button"
              id="EntryEdit__button-cancel"
              aria-label="cancel"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="EntryEdit__button-submit"
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

EntryEdit.defaultProps = {
  match: {
    params: {},
  },
  history: {
    push: () => {},
  },
};

EntryEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
