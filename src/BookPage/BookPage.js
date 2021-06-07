import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import Review from "../Review/Review";
import Context from "../Context";
import "./BookPage.css";

export default class BookPage extends React.Component {
  state = {
    book_id: "",
    book_title: "",
    book_author: "",
    book_genre: "",
    book_date_started: "",
    book_finished: false,
    book_date_modified: "",
    review_id: "",
    review_book_id: "",
    review_rating: "",
    review_favorite: "",
    review_dislike: "",
    review_takeaway: "",
    review_notes: "",
    review_recommend: false,
  };

  static contextType = Context;

  componentDidMount() {
    const { book_id } = this.props.match.params;
    const findBook = (books, book_id) =>
      books.find((book) => book.book_id === book_id);
    const book = findBook(this.context.books, book_id);

    this.setState({
      book_id: book.book_id,
      book_title: book.book_title,
      book_author: book.book_author,
      book_genre: book.book_genre,
      book_date_started: book.book_date_started,
      book_finished: book.book_finished,
      book_date_modified: book.book_date_modified,
    });

    this.isFinished();
  }

  isFinished = () => {
    const { book_id, book_finished } = this.state;

    if (book_finished) {
      const findReview = (reviews, book_id) => {
        reviews.find((review) => review.review_book_id === book_id);
      };
      const review = findReview(this.context.reviews, book_id);
      console.log(review);
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
    } else return;
  };

  isReview = () => {
    const {
      book_id,
      book_finished,
      review_id,
      review_book_id,
      review_rating,
      review_favorite,
      review_dislike,
      review_takeaway,
      review_notes,
      review_recommend,
    } = this.state;

    if (book_finished) {
      return (
        <>
          <Review
            review_id={review_id}
            review_book_id={review_book_id}
            review_rating={review_rating}
            review_favorite={review_favorite}
            review_dislike={review_dislike}
            review_takeaway={review_takeaway}
            review_notes={review_notes}
            review_recommend={review_recommend}
          />
        </>
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

  handleClickDelete = (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to remove this book?\nClick OK to remove."
      )
    ) {
      this.context.deleteBook(this.state.book_id);
      this.props.history.push("/books");
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
            <Link to={`/edit-book/${book_id}`}>
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
            {this.isReview()}
          </div>
        </div>
        <div className="BookPage__button-container-move">
          <button type="button" id="BookPage__previous" aria-label="previous">
            Previous
          </button>

          <button type="button" id="BookPage__next" aria-label="next">
            Next
          </button>
        </div>
      </>
    );
  }
}
