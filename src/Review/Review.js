import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import "./Review.css";

export default class Review extends React.Component {
  static contextType = Context;

  handlClickDelete = (e) => {
    e.preventDefault();
    this.context.editReview(this.props.review_id);
    this.props.history.push(`/books/${this.props.review_book_id}`);
  };

  render() {
    const {
      review_id,
      //review_book_id,
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
        <h3>My Review</h3>
        <p>
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
