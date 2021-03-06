import React from "react";
import Context from "../Context";
import config from "../config";
import PropTypes from "prop-types";
import "./ReviewForm.css";

export default class ReviewForm extends React.Component {
  state = {
    error: null,
    review_book_id: "",
    review_rating: "0",
    review_favorite: "",
    review_dislike: "",
    review_takeaway: "",
    review_notes: "",
    review_recommend: "",
    review_date_finished: "",
    book_title: "",
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
          review_book_id: book_id,
          book_title: res.book_title,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeDateFinished = (e) => {
    const date = new Date(e.target.value);
    this.setState({ review_date_finished: date });
  };

  handleChangeRating = (e) => {
    this.setState({
      review_rating: e.target.value,
    });
  };

  handleChangeFavorite = (e) => {
    this.setState({
      review_favorite: e.target.value,
    });
  };

  handleChangeDislike = (e) => {
    this.setState({
      review_dislike: e.target.value,
    });
  };

  handleChangeTakeaway = (e) => {
    this.setState({
      review_takeaway: e.target.value,
    });
  };

  handleChangeNotes = (e) => {
    this.setState({
      review_notes: e.target.value,
    });
  };

  handleChangeRecommend = (e) => {
    const yes_no = () => {
      if (e.target.value === "yes") {
        return true;
      }
      if (e.target.value === "no") {
        return false;
      }
    };
    this.setState({
      review_recommend: yes_no(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      review_book_id,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
      review_date_finished,
    } = this.state;

    const newReview = {
      review_book_id: review_book_id,
      review_rating: review_rating,
      review_favorite: review_favorite,
      review_dislike: review_dislike,
      review_takeaway: review_takeaway,
      review_notes: review_notes,
      review_recommend: review_recommend,
      review_date_finished: review_date_finished,
    };

    fetch(`${config.API_ENDPOINT}/reviews`, {
      method: "POST",
      body: JSON.stringify(newReview),
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
        this.context.addReview(newReview, review_book_id);
        this.props.history.push(`/books/${review_book_id}`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleCancel = () => {
    this.props.history.push(`/books/${this.state.review_book_id}`);
  };

  render() {
    const { book_title } = this.state;

    return (
      <div className="ReviewForm">
        <div className="ReviewForm__header">
          <h2>Congratulations!!</h2>
          <h2 className="large">
            You finished <span className="italic">'{book_title}'</span>.
          </h2>
          <h2>Write your review:</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="book-date-finished" className="bold">
            Date Finished:
          </label>
          <input
            id="book-date-finished"
            type="date"
            aria-label="date"
            onChange={this.handleChangeDateFinished}
            required
          ></input>
          <br />
          <label htmlFor="review_rating" className="bold">
            Rating (0-10):
          </label>
          <input
            id="review_rating"
            type="number"
            aria-label="rating"
            min="0"
            max="10"
            defaultValue="0"
            onChange={this.handleChangeRating}
            required
          ></input>
          <br />
          <label htmlFor="review_favorite" className="bold">
            What was your favorite part of this book?
          </label>
          <br />
          <textarea
            id="review_favorite"
            aria-label="favorite"
            onChange={this.handleChangeFavorite}
          ></textarea>
          <br />
          <label htmlFor="review_dislike" className="bold">
            Was there anything about this book that you did not like?
          </label>
          <br />
          <textarea
            id="review_dislike"
            aria-label="dislikes"
            onChange={this.handleChangeDislike}
          ></textarea>
          <br />
          <label htmlFor="review_takeaway" className="bold">
            What was your biggest takeaway from this book?
          </label>
          <br />
          <textarea
            id="reivew_takeaway"
            aria-label="takeaway"
            onChange={this.handleChangeTakeaway}
          ></textarea>
          <br />
          <label htmlFor="review_notes" className="bold">
            Is there anything else you want to note about this book?
          </label>
          <br />
          <textarea
            id="review_notes"
            aria-label="other"
            onChange={this.handleChangeNotes}
          ></textarea>
          <br />
          <label htmlFor="yes_no" className="bold">
            Would you recommend this book to a friend?
          </label>
          <br />
          <input
            type="radio"
            name="yes_no"
            id="recommend_yes"
            aria-label="yes"
            value="yes"
            onChange={this.handleChangeRecommend}
            required
          />
          <label htmlFor="recommend_yes">Yes</label>
          <input
            type="radio"
            name="yes_no"
            id="recommend_no"
            aria-label="no"
            value="no"
            onChange={this.handleChangeRecommend}
            required
          />
          <label htmlFor="recommendno">No</label>
          <div className="ReviewForm__button-container">
            <button
              type="button"
              id="ReviewForm__button-cancel"
              aria-label="cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="ReviewForm__button-submit"
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

ReviewForm.defaultProps = {
  match: {
    params: {},
  },
  history: {
    push: () => {},
  },
};

ReviewForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
