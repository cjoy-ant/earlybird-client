import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <header>
        <Link to="/" exact="true">
          EarlyBird
        </Link>
      </header>
      <nav>
        <Link to="/about" exact="true">
          About
        </Link>
        <Link to="/books" exact="true">
          Books
        </Link>
        <Link to="/entries" exact="true">
          Recent Entries
        </Link>
      </nav>
    </div>
  );
}
