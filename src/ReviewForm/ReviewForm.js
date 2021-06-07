import React from "react";
import Context from "../Context";
import "./ReviewForm.css";

export default class ReivewForm extends React.Component {
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
    const { book_id } = this.props.match.params;
    this.setState({
      review_book_id: book_id,
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
  };

  handleCancel = () => {
    this.props.history.push(`/books/${this.state.review_book_id}`);
  };

  render() {
    return (
      <div className="ReviewForm">
        <h2 className="italics">Congrats on finishing this book!</h2>
        <h2>Review this book:</h2>
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
            value="true"
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
            onSelect={this.handleChangeRecommend}
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
