import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EntryAdd from "./EntryAdd";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EntryAdd />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
