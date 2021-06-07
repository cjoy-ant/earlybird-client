import React, { Component } from "react";
import { Route } from "react-router-dom";
import Context from "../Context";
import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import About from "../About/About";
import BookList from "../BookList/BookList";
import BookPage from "../BookPage/BookPage";
import BookAdd from "../BookAdd/BookAdd";
import BookEdit from "../BookEdit/BookEdit";
import EntryList from "../EntryList/EntryList";
import EntryPage from "../EntryPage/EntryPage";
import EntryAdd from "../EntryAdd/EntryAdd";
import EntryEdit from "../EntryEdit/EntryEdit";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./App.css";
import STORE from "../STORE";

class App extends Component {
  state = {
    books: [],
    entries: [],
    reviews: [],
  };

  componentDidMount() {
    this.setState({
      books: STORE.books,
      entries: STORE.entries,
      reviews: STORE.reviews,
    });
  }

  addBook = (newBook) => {
    this.setState({
      books: [...this.state.books, newBook],
    });
  };

  editBook = (updatedBook) => {
    this.setState({
      books: this.state.books.map((b) =>
        b.book_id !== updatedBook.book_id ? b : updatedBook
      ),
    });
  };

  deleteBook = (book_id) => {
    const newBooks = this.state.books.filter((b) => b.book_id !== book_id);
    this.setState({
      books: newBooks,
    });
  };

  addEntry = (newEntry) => {
    this.setState({
      entries: [...this.state.entries, newEntry],
    });
  };

  editEntry = (updatedEntry) => {
    this.setState({
      entries: this.state.entries.map((e) =>
        e.entry_id !== updatedEntry.entry_id ? e : updatedEntry
      ),
    });
  };

  deleteEntry = (entry_id) => {
    const newEntries = this.state.entries.filter(
      (e) => e.entry_id !== entry_id
    );
    this.setState({
      entries: newEntries,
    });
  };

  addReview = (newReview, review_book_id) => {
    this.setState({
      reviews: [...this.state.reviews, newReview],
    });
    const findBook = () => {
      const book = this.state.books.find(
        (book) => book.book_id === review_book_id
      );
      console.log(book);
      return book;
    };
    const book = findBook();
    const bookFinished = {
      book_id: book.book_id,
      book_title: book.book_title,
      book_author: book.book_author,
      book_genre: book.book_genre,
      book_date_started: book.book_date_started,
      book_finished: true, // changed to TRUE
    };
    this.setState({
      books: this.state.books.map((b) =>
        b.book_id !== review_book_id ? b : bookFinished
      ),
    });
  };

  editReview = (review_id) => {};

  deleteReview = (review_id, review_book_id) => {
    const newReviews = this.state.reviews.filter(
      (r) => r.review_id !== review_id
    );
    this.setState({
      reviews: newReviews,
    });

    const findBook = () => {
      const book = this.state.books.find(
        (book) => book.book_id === review_book_id
      );
      console.log(book);
      return book;
    };
    const book = findBook();
    const bookNotFinished = {
      book_id: book.book_id,
      book_title: book.book_title,
      book_author: book.book_author,
      book_genre: book.book_genre,
      book_date_started: book.book_date_started,
      book_finished: false, // changed to FALSE
    };
    this.setState({
      books: this.state.books.map((b) =>
        b.book_id !== review_book_id ? b : bookNotFinished
      ),
    });
  };

  render() {
    const value = {
      books: this.state.books,
      entries: this.state.entries,
      reviews: this.state.reviews,
      addBook: this.addBook,
      editBook: this.editBook,
      deleteBook: this.deleteBook,
      addEntry: this.addEntry,
      editEntry: this.editEntry,
      deleteEntry: this.deleteEntry,
      addReview: this.addReview,
      editReview: this.editReview,
      deleteReview: this.deleteReview,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <Route path="/" component={Nav} />
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/books" exact component={BookList} />
          <Route path="/books/:book_id" component={BookPage} />
          <Route path="/add-book" component={BookAdd} />
          <Route path="/edit-book/:book_id" component={BookEdit} />
          <Route path="/entries" exact component={EntryList} />
          <Route path="/entries/:entry_id" component={EntryPage} />
          <Route path="/add-entry" component={EntryAdd} />
          <Route path="/edit-entry/:entry_id" component={EntryEdit} />
          <Route path="/review-book/:book_id" component={ReviewForm} />
          <footer>© 2021 EarlyBird</footer>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
