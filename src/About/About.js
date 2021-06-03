import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="About">
      <h2>About EarlyBird</h2>
      <div className="About__description">
        <p>
          Have you ever opened the book you were currently reading, whether for
          pleasure or work, and forgotten everything you just read in the last
          chapter? EarlyBird encourages you to write “mini book reports” to help
          you reflect on, remember, and discuss the information you just
          consumed.
        </p>
        <p>
          Choose how often you want to log a report (e.g., after every chapter,
          after finishing the book, or whenever you feel inspired to). Write
          about any new facts or vocabulary you learned, quotes that moved you,
          and more.
        </p>
        <p>
          Additional features may include suggesting similar books to the user
          after they have completed a book, and, once user authentication is
          added, sharing who of your friends is reading the same book.
        </p>
      </div>
    </div>
  );
}
