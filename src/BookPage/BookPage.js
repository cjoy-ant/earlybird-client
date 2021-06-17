import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import Entry from "../Entry/Entry";
import Review from "../Review/Review";
import Context from "../Context";
import config from "../config";
import PropTypes from "prop-types";
import "./BookPage.css";

export default class BookPage extends React.Component {
  state = {
    error: null,
    book_id: "",
    book_title: "",
    book_author: "",
    book_genre: "",
    book_date_started: "",
    book_finished: "",
    book_date_modified: "",
    review_id: "",
    review_book_id: "",
    review_date_finished: "",
    review_rating: "",
    review_favorite: "",
    review_dislike: "",
    review_takeaway: "",
    review_notes: "",
    review_recommend: "",
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
      .then(() => {
        if (this.state.book_finished) {
          const findReview = (reviews, book_id) => {
            const review = reviews.find(
              (review) => review.review_book_id === book_id
            );
            return review;
          };
          const review = findReview(this.context.reviews, book_id);
          this.setState({
            review_id: review.review_id,
            review_book_id: review.review_book_id,
            review_date_finished: review.review_date_finished,
            review_rating: review.review_rating,
            review_favorite: review.review_favorite,
            review_dislike: review.review_dislike,
            review_takeaway: review.review_takeaway,
            review_notes: review.review_notes,
            review_recommend: review.review_recommend,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  isReview = () => {
    const {
      book_id,
      book_finished,
      review_id,
      review_book_id,
      review_date_finished,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
    } = this.state;

    if (book_finished) {
      return (
        <div className="BookPage__review">
          <Review
            review_id={review_id}
            review_book_id={review_book_id}
            review_date_finished={review_date_finished}
            review_rating={review_rating}
            review_favorite={review_favorite}
            review_dislike={review_dislike}
            review_takeaway={review_takeaway}
            review_notes={review_notes}
            review_recommend={review_recommend}
            history={this.props.history}
          />
        </div>
      );
    } else {
      return (
        <Link to={`/review-book/${book_id}`}>
          <button type="button" id="BookPage__finished">
            Mark as Finished
          </button>
        </Link>
      );
    }
  };

  isEntries = () => {
    const entries = this.context.entries.filter(
      (entry) => entry.entry_book_id === this.state.book_id
    );
    return entries;
  };

  findEntries = () => {
    const entries = this.isEntries();

    if (entries.length > 0) {
      const entryList = entries.map((entry) => {
        return (
          <li key={entry.entry_id}>
            <Entry
              entry_id={entry.entry_id}
              entry_book_id={entry.entry_book_id}
              entry_title={entry.entry_title}
              entry_category={entry.entry_category}
              entry_chapters={entry.entry_chapters}
              entry_pages={entry.entry_pages}
              entry_quote={entry.entry_quote}
              entry_notes={entry.entry_notes}
              entry_date_modified={entry.entry_date_modified}
            />
          </li>
        );
      });
      return (
        <>
          <ul>{entryList}</ul>{" "}
          <Link to="/add-entry">
            <button className="BookPage__add-entry-button">Add an entry</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <p className="italic">
            Write your first entry about '
            <span className="bold">{this.state.book_title}</span>'
          </p>
          <div className="BookPage__add-entry-button-container">
            <Link to="/add-entry">
              <button className="BookPage__add-entry-button">
                Add an entry
              </button>
            </Link>
          </div>
        </>
      );
    }
  };

  handleClickDelete = (e) => {
    e.preventDefault();
    const { book_id } = this.props.match.params;
    if (
      window.confirm(
        "Are you sure you want to remove this book?\nClick OK to remove."
      )
    ) {
      fetch(`${config.API_ENDPOINT}/books/${book_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteBook(book_id);
          this.props.history.push("/books");
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

  render() {
    const {
      book_id,
      book_title,
      book_author,
      book_genre,
      book_date_started,
      book_finished,
      book_date_modified,
    } = this.state;

    return (
      <>
        <div className="BookPage">
          <Book
            book_id={book_id}
            book_title={book_title}
            book_author={book_author}
            book_genre={book_genre}
            book_date_started={book_date_started}
            book_finished={book_finished}
            book_date_modified={book_date_modified}
          />
          <div className="BookPage__button-container">
            <Link to={`/edit-book/${book_id}`} book_id={book_id}>
              <button type="button" id="BookPage__edit" aria-label="edit">
                Edit
              </button>
            </Link>
            <button
              type="button"
              id="BookPage__delete"
              aria-label="delete"
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
            <br />
          </div>
          {this.isReview()}
          <br />
          <div className="BookPage__entries">
            <h3> • ENTRIES •</h3>
            {this.findEntries()}
          </div>
          <div className="BookPage__add-entry-button-container"></div>
        </div>
        {/* <div className="BookPage__button-container-move">
          <div className="button-left">
            <button type="button" id="BookPage__previous" aria-label="previous">
              Previous
            </button>
          </div>
          <div className="button-right">
            <button type="button" id="BookPage__next" aria-label="next">
              Next
            </button>
          </div>
        </div> */}
      </>
    );
  }
}

BookPage.defaultProps = {
  match: {
    params: {},
  },
  history: {
    push: () => {},
  },
};

BookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
