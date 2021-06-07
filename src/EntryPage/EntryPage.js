import React from "react";
import { Link } from "react-router-dom";
import Entry from "../Entry/Entry";
import Context from "../Context";
import "./EntryPage.css";

export default class EntryPage extends React.Component {
  state = {
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

  static contextType = Context;

  componentDidMount() {
    const { entry_id } = this.props.match.params;
    const findEntry = (entries, entry_id) =>
      entries.find((entry) => entry.entry_id === entry_id);
    const entry = findEntry(this.context.entries, entry_id);

    this.setState({
      entry_id: entry.entry_id,
      entry_book_id: entry.entry_book_id,
      entry_title: entry.entry_title,
      entry_category: entry.entry_category,
      entry_chapters: entry.entry_chapters,
      entry_pages: entry.entry_pages,
      entry_quote: entry.entry_quote,
      entry_notes: entry.entry_notes,
      entry_date_modified: entry.entry_date_modified,
    });
  }

  handleClickDelete = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to remove this entry?\nClick OK to remove."
      )
    ) {
      this.context.deleteEntry(this.state.entry_id);
      this.props.history.push("/entries");
    }
  };

  render() {
    return (
      <>
        <div className="EntryPage">
          <Entry
            entry_id={this.state.entry_id}
            entry_book_id={this.state.entry_book_id}
            entry_title={this.state.entry_title}
            entry_category={this.state.entry_category}
            entry_chapters={this.state.entry_chapters}
            entry_pages={this.state.entry_pages}
            entry_quote={this.state.entry_quote}
            entry_notes={this.state.entry_notes}
            entry_date_modified={this.state.entry_date_modified}
          />
          <div className="EntryPage__button-container">
            <Link to={`/edit-entry/${this.state.entry_id}`}>
              <button type="button" id="EntryPage__edit" aria-label="edit">
                Edit
              </button>
            </Link>
            <button
              type="button"
              id="EntryPage__delete"
              aria-label="delete"
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
          </div>
        </div>
        {/* <div className="EntryPage__button-container-move">
          <div className="button-left">
            <button
              type="button"
              id="EntryPage__previous"
              aria-label="previous"
            >
              Previous
            </button>
          </div>
          <div className="button-right">
            <button type="button" id="EntryPage__next" aria-label="next">
              Next
            </button>
          </div>
        </div> */}
      </>
    );
  }
}
