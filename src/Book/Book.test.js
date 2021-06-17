import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Book from "./Book";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    book_id: "2a95459a-a929-11eb-bcbc-0242ac130002",
    book_title: "test",
    book_author: "test",
    book_genre: "test",
    book_date_started: "test",
    book_finished: false,
  };
  ReactDOM.render(
    <BrowserRouter>
      <Book {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
