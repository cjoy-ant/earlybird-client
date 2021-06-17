import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReviewEdit from "./ReviewEdit";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ReviewEdit />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
