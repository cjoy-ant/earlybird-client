import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import About from "../About/About";
import BookList from "../BookList/BookList";
import BookPage from "../BookPage/BookPage";
import EntryList from "../EntryList/EntryList";
import EntryPage from "../EntryPage/EntryPage";
import "./App.css";
import STORE from "../STORE";

class App extends Component {
  state = {
    books: [],
    entries: [],
  };

  componentDidMount() {
    this.setState({ books: STORE.books, entries: STORE.entries });
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route path="/" exact="true" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/books" exact="true" component={BookList} />
        <Route path="/books/:book_id" component={BookPage} />
        <Route path="/entries" exact="true" component={EntryList} />
        <Route path="/entries/:entry_id" component={EntryPage} />
        <footer>© 2021 EarlyBird</footer>
      </div>
    );
  }
}

export default App;
