import React from "react";
import Context from "../Context";
import "./ReviewEdit.css";

export default class ReviewEdit extends React.Component {
  state = {
    review_id: "",
    review_book_id: "",
    review_rating: "",
    review_favorite: "",
    review_dislike: "",
    review_takeaway: "",
    review_notes: "",
    review_recommend: "",
  };

  static contextType = Context;

  componentDidMount() {
    const { reviews } = this.context;
    const { review_id } = this.props.match.params;
    const findReview = (reviews, review_id) =>
      reviews.find((review) => review.review_id === review_id);
    const review = findReview(reviews, review_id);

    this.setState({
      review_id: review.review_id,
      review_book_id: review.review_book_id,
      review_rating: review.review_rating,
      review_favorite: review.review_favorite,
      review_dislike: review.review_dislike,
      review_takeaway: review.review_takeaway,
      review_notes: review.review_notes,
      review_recommend: review.review_recommend,
    });
  }

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
    this.setState({
      review_recommend: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedReview = {
      review_id: this.state.review_id,
      review_book_id: this.state.review_book_id,
      review_rating: this.state.review_rating,
      review_favorite: this.state.review_favorite,
      review_dislike: this.state.review_dislike,
      review_takeaway: this.state.review_takeaway,
      review_notes: this.state.review_notes,
      review_recommend: this.state.review_recommend,
    };

    this.context.editReview(updatedReview, this.state.review_book_id);
    this.props.history.push("/books");
  };

  handleCancel = () => {
    this.props.history.push(`/books/${this.state.review_book_id}`);
  };

  render() {
    const {
      review_id,
      review_book_id,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
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

    // const findBook = (books, book_id) => {
    //   const book = books.find((book) => book.book_id === book_id);
    //   return book;
    // };
    // const book = findBook(this.context.books, review_book_id);
    // {book.book_title} keeps erroring as "Cannot read property 'book_title' of undefined"
    // but console.log shows that it is returning the correct book ????

    return (
      <div className="ReviewEdit">
        <h2>Edit your review</h2>
        <form onSubmit={this.handleSubmit}>
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
            value="true"
            checked={recommendYes()}
            onSelect={this.handleChangeRecommend}
            required
          />
          <label htmlFor="recommend_yes">Yes</label>
          <input
            type="radio"
            name="yes_no"
            id="recommend_no"
            aria-label="no"
            value="false"
            checked={recommendNo()}
            onSelect={this.handleChangeRecommend}
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
