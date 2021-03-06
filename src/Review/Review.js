import React from "react";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
import Context from "../Context";
import config from "../config";
import PropTypes from "prop-types";
import "./Review.css";

export default class Review extends React.Component {
  static contextType = Context;

  handleClickDelete = (e) => {
    e.preventDefault();
    const { review_id, review_book_id } = this.props;
    if (
      window.confirm(
        "Are you sure you want to remove this review?\nIf removed, this book will be marked as NOT finished.\nClick OK to remove."
      )
    ) {
      fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteBook(review_id);
          this.props.history.push(`/books/${review_book_id}`);
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

  render() {
    const {
      review_id,
      review_date_finished,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
    } = this.props;

    const isFavorite = () => {
      if (review_favorite === "") {
        return;
      } else {
        return (
          <>
            <span className="bold">My favorite part:</span> {review_favorite}
            <br />
          </>
        );
      }
    };

    const isDislike = () => {
      if (review_dislike === "") {
        return;
      } else {
        return (
          <>
            <span className="bold">What I disliked:</span> {review_dislike}
            <br />
          </>
        );
      }
    };

    const isTakeaway = () => {
      if (review_takeaway === "") {
        return;
      } else {
        return (
          <>
            <span className="bold">Biggest takeaway:</span> {review_takeaway}
            <br />
          </>
        );
      }
    };

    const isNotes = () => {
      if (review_notes === "") {
        return;
      } else {
        return (
          <>
            <span className="bold">Other notes:</span> {review_notes}
            <br />
          </>
        );
      }
    };

    const recommend = () => {
      if (review_recommend) {
        return "Yes";
      } else {
        return "No";
      }
    };

    return (
      <div className="Review">
        <h3> ??? MY REVIEW ???</h3>
        <p>
          <span className="bold">Finished on:</span>{" "}
          {/* {format(utcToZonedTime(review_date_finished), "MMMM d, yyyy")} */}
          {review_date_finished.substr(0, 10)}
          <br />
          <span className="bold">Rating:</span> {review_rating}/10
          <br />
          {isFavorite()}
          {isDislike()}
          {isTakeaway()}
          {isNotes()}
          <span className="bold">
            Would I recommend this book to a friend?
          </span>{" "}
          {recommend()}
        </p>
        <div className="Review__button-container">
          <Link to={`/edit-review/${review_id}`}>
            <button type="button" id="Review__edit" aria-label="edit">
              Edit
            </button>
          </Link>
          <button
            type="button"
            id="Review__delete"
            aria-label="delete"
            onClick={this.handleClickDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Review.defaultProps = {
  review_id: "",
  review_book_id: "",
  review_date_finished: "",
  review_rating: "",
  review_favorite: "",
  review_dislike: "",
  review_takeaway: "",
  review_notes: "",
  review_recommend: true,
};

Review.propTypes = {
  review_id: PropTypes.string.isRequired,
  review_book_id: PropTypes.string.isRequired,
  review_date_finished: PropTypes.string.isRequired,
  review_rating: PropTypes.string.isRequired,
  review_favorite: PropTypes.string.isRequired,
  review_dislike: PropTypes.string.isRequired,
  review_takeaway: PropTypes.string.isRequired,
  review_notes: PropTypes.string.isRequired,
  review_recommend: PropTypes.bool.isRequired,
};
