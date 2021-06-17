import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BookEdit from "./BookEdit";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <BookEdit />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
