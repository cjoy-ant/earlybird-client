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
import ReviewEdit from "../ReviewEdit/ReviewEdit";
import "./App.css";
import STORE from "../STORE";

class App extends Component {
  state = {
    books: [],
    entries: [],
    reviews: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/books`),
      fetch(`${config.API_ENDPOINT}/entries`),
      fetch(`${config.API_ENDPOINT}/reviews`),
    ])
      .then(([booksRes, entriesRes, reviewsRes]) => {
        if (!booksRes.ok) {
          return booksRes.json().then((e) => Promise.reject(e));
        }
        if (!entriesRes.ok) {
          return entriesRes.json().then((e) => Promise.reject(e));
        }
        if (!reviewsRes.ok) {
          return reviewsRes.json().then((e) => Promise.reject(e));
        }
        return Promise.all([
          booksRes.json(),
          entriesRes.json(),
          reviewsRes.json(),
        ]);
      })
      .then(([books, entries, reviews]) => {
        this.setState({ books, entries, reviews });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  fetchBooks = () => {
    fetch(`${config.API_ENDPOINT}/books`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          books: res,
        });
      });
  };

  fetchEntries = () => {
    fetch(`${config.API_ENDPOINT}/entries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          entries: res,
        });
      });
  };

  fetchReviews = () => {
    fetch(`${config.API_ENDPOINT}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          reviews: res,
        });
      });
  };

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

  editReview = (updatedReview, review_id) => {
    this.setState({
      reviews: this.state.reviews.map((r) =>
        r.review_id !== updatedReview.review_id ? review_id : updatedReview
      ),
    });
  };

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
          <Route path="/edit-review/:review_id" component={ReviewEdit} />
          <footer>© 2021 EarlyBird</footer>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
