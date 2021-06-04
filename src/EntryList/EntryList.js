import React from "react";
import { Link } from "react-router-dom";
import Entry from "../Entry/Entry";
import STORE from "../STORE";
import "./EntryList.css";

export default class EntryList extends React.Component {
  makeEntryList = () => {
    const entryList = STORE.entries.map((entry) => {
      return (
        <li key={entry.entry_id}>
          <Entry
            entry_id={entry.entry_id}
            entry_book_id={entry.entry_book_id}
            entry_title={entry.entry_title}
            entry_category={entry.entry_category}
            entry_chapters={entry.entry_chapters}
            entry_pages={entry.entry_pages}
            entry_content={entry.entry_content}
            entry_date_modified={entry.entry_date_modified}
          />
        </li>
      );
    });
    return entryList;
  };

  render() {
    return (
      <div className="EntryList">
        <h2>Entries</h2>
        <div className="EntryList__button-container">
          <Link to="/add-entry">
            <button className="EntryList__button-add">Add an entry</button>
          </Link>
        </div>
        <ul>{this.makeEntryList()}</ul>
      </div>
    );
  }
}
