import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="About">
      <h2>About EarlyBird</h2>
      <div className="About__description">
        <div className="About__intro">
          <p>
            Have you ever opened the book you were currently reading, whether
            for pleasure or work, and forgotten everything you just read in the
            last chapter?
          </p>
          <p>
            EarlyBird encourages you bookworms to{" "}
            <span class="bold italic">
              read actively, consume literature intentionally, and reflect
              diligently
            </span>{" "}
            by taking notes and writing reviews on your current reading list.
          </p>
        </div>
        <p>
          <h3>How to use EarlyBird:</h3>
          <ul>
            <li>
              <span class="bold">BOOKS:</span> This tab shows your reading list.
              Keep track of your books by adding them to this list by clicking
              on the 'Add Book' button at the top of the page. Navigate to each
              book's designated page by clicking on the TITLE.
            </li>
            <li>
              <span class="bold">ENTRIES:</span> This tab shows a list of
              entries you've written. Log entries whenever you discover useful
              information, come across a quote that moved you, learn new
              vocabulary, or whenver you feel inspired by clicking on the 'Add
              Entry' button at the top of the page. You will also be able to see
              a list of entries for its corresponding book on each book's
              designated page.
            </li>
            <li>
              <span class="bold">REVIEWS:</span> When you're done with a book,
              mark it as finished via that book's page, and write a review. If
              you delete a review, it will mark the book as not finished. You
              can view your reviews under each book's designated page.
            </li>
            <li>
              <span class="bold">EDIT / DELETE:</span> To make any edits or to
              delete your books, entries, or reviews, go to the page for that
              book or entry by clicking on the TITLE.
            </li>
          </ul>
        </p>
        <br />
        <p>
          Additional features that we want to add to this app in the future may
          include:
          <ul>
            <li>
              A suggestion page that provides a list of similar reads you may be
              interested in after you finish a book
            </li>
            <li>
              User authentication (i.e., creating an account) to allow for
              EarlyBird to be used as a social platform where bookworms can
              share their reading list and notes with friends or book club peers
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}
