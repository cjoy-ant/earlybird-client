import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Entry from "./Entry";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    entry_id: "f3a7988a-cfbb-11eb-b8bc-0242ac130003",
    entry_book_id: "2a95459a-a929-11eb-bcbc-0242ac130002",
    entry_title: "test",
    entry_category: "test",
    entry_chapters: "test",
    entry_pages: "test",
    entry_quote: "test",
    entry_notes: "test",
    entry_date_modified: "test",
  };
  ReactDOM.render(
    <BrowserRouter>
      <Entry {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
