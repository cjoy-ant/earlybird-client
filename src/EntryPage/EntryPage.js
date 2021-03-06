import React from "react";
import { Link } from "react-router-dom";
import Entry from "../Entry/Entry";
import Context from "../Context";
import config from "../config";
import PropTypes from "prop-types";
import "./EntryPage.css";

export default class EntryPage extends React.Component {
  state = {
    error: null,
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
          entry_book_id: res.entry_book_id,
          entry_title: res.entry_title,
          entry_category: res.entry_category,
          entry_chapters: res.entry_chapters,
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

  handleClickDelete = (e) => {
    e.preventDefault();
    const { entry_id } = this.props.match.params;

    if (
      window.confirm(
        "Are you sure you want to remove this entry?\nClick OK to remove."
      )
    ) {
      fetch(`${config.API_ENDPOINT}/entries/${entry_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteEntry(entry_id);
          this.props.history.push("/entries");
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

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
    } = this.state;

    return (
      <>
        <div className="EntryPage">
          <Entry
            entry_id={entry_id}
            entry_book_id={entry_book_id}
            entry_title={entry_title}
            entry_category={entry_category}
            entry_chapters={entry_chapters}
            entry_pages={entry_pages}
            entry_quote={entry_quote}
            entry_notes={entry_notes}
            entry_date_modified={entry_date_modified}
          />
          <div className="EntryPage__button-container">
            <Link to={`/edit-entry/${entry_id}`}>
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

EntryPage.defaultProps = {
  match: {
    params: {},
  },
  history: {
    push: () => {},
  },
};

EntryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
