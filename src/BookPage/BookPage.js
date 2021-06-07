import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import Entry from "../Entry/Entry";
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

    if (book.book_finished) {
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
        review_rating: review.review_rating,
        review_favorite: review.review_favorite,
        review_dislike: review.review_dislike,
        review_takeaway: review.review_takeaway,
        review_notes: review.review_notes,
        review_recommend: review.review_recommend,
      });
    }
  }

  // isFinished = () => {
  //   const { book_id, book_finished } = this.props.match.params;
  //   console.log(book_finished);
  //   if (book_finished) {
  //     const findReview = (reviews, book_id) =>
  //       reviews.find((review) => review.review_book_id === book_id);
  //     const review = findReview(this.context.reviews, book_id);
  //     console.log(review);
  //     this.setState({
  //       review_id: review.review_id,
  //       review_book_id: review.review_book_id,
  //       review_rating: review.review_rating,
  //       review_favorite: review.review_favorite,
  //       review_dislike: review.review_dislike,
  //       review_takeaway: review.review_takeaway,
  //       review_notes: review.review_notes,
  //       review_recommend: review.review_recommend,
  //     });
  //   } else return;
  // };

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

  isEntries = () => {
    const entries = this.context.entries.filter(
      (entry) => entry.entry_book_id === this.state.book_id
    );
    return entries;
  };

  findEntries = () => {
    // const isEntries = (entries, book_id) => {
    // entries.filter((entry) => entry.entry_book_id === book_id);
    // };
    // const entries = isEntries(this.context.entries, this.state.book_id);
    // console.log(entries);

    const entries = this.isEntries();

    if (entries.length > 0) {
      const entryList = entries.map((entry) => {
        return (
          <li>
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
      return <ul>{entryList}</ul>;
    } else {
      return (
        <p class="italic">
          Write your first entry about '{this.state.book_title}'
        </p>
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
            <br />
            <div className="BookPage__entries">
              <h3>Entries</h3>
              {this.findEntries()}
            </div>
          </div>
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
