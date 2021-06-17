import React from "react";
import Context from "../Context";
import config from "../config";
import "./ReviewEdit.css";

export default class ReviewEdit extends React.Component {
  state = {
    review_id: "",
    review_book_id: "",
    review_date_finished: "",
    review_rating: "",
    review_favorite: "",
    review_dislike: "",
    review_takeaway: "",
    review_notes: "",
    review_recommend: "",
    review_date_modified: "",
    book_title: "",
  };

  static contextType = Context;

  componentDidMount() {
    const { review_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
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
          review_id: res.review_id,
          review_book_id: res.review_book_id,
          review_date_finished: res.review_date_finished,
          review_rating: res.review_rating,
          review_favorite: res.review_favorite,
          review_dislike: res.review_dislike,
          review_takeaway: res.review_takeaway,
          review_notes: res.review_notes,
          review_recommend: res.review_recommend,
          review_date_modified: res.review_date_modified,
        });

        fetch(`${config.API_ENDPOINT}/books/${res.review_book_id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((bookRes) => {
            if (!bookRes.ok) {
              return bookRes.json().then((error) => Promise.reject(error));
            }
            return bookRes.json();
          })
          .then((bookRes) => {
            this.setState({
              book_title: bookRes.book_title,
            });
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
    const { review_id } = this.props.match.params;
    const { review_book_id } = this.state;

    const updatedReview = {
      review_id: this.state.review_id,
      review_book_id: this.state.review_book_id,
      review_date_finished: this.state.review_date_finished,
      review_rating: this.state.review_rating,
      review_favorite: this.state.review_favorite,
      review_dislike: this.state.review_dislike,
      review_takeaway: this.state.review_takeaway,
      review_notes: this.state.review_notes,
      review_recommend: this.state.review_recommend,
    };

    fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedReview),
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
        this.context.editReview(updatedReview);
        this.props.history.push(`/books/${review_book_id}`);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  handleCancel = () => {
    this.props.history.push(`/books/${this.state.review_book_id}`);
  };

  render() {
    const {
      review_date_finished,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
      book_title,
    } = this.state;

    const recommendYes = () => {
      if (review_recommend) {
        return "checked";
      } else {
        return "";
      }
    };

    const recommendNo = () => {
      if (!review_recommend) {
        return "checked";
      } else {
        return "";
      }
    };

    return (
      <div className="ReviewEdit">
        <h2>
          Edit your review for <br />
          <span className="italic">'{book_title}'</span>
        </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="book-date-finished" className="bold">
            Date Finished:
          </label>
          <input
            id="book-date-finished"
            type="date"
            aria-label="date"
            defaultValue={review_date_finished.substr(0, 10)}
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
            defaultValue={review_rating}
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
            defaultValue={review_favorite}
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
            defaultValue={review_dislike}
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
            defaultValue={review_takeaway}
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
            defaultValue={review_notes}
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
            checked={recommendYes()}
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
            checked={recommendNo()}
            onChange={this.handleChangeRecommend}
            required
          />
          <label htmlFor="recommendno">No</label>
          <div className="ReviewEdit__button-container">
            <button
              type="button"
              id="ReviewEdit__button-cancel"
              aria-label="cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="ReviewEdit__button-submit"
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
