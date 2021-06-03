import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
      </div>
    );
  }
}

export default App;
