import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import About from "../About/About";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
