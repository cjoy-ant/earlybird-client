import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BookAdd from "./BookAdd";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <BookAdd />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
