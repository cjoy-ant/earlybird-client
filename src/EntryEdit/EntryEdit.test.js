import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EntryEdit from "./EntryEdit";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EntryEdit />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
