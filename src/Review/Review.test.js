import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Review from "./Review";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    review_id: "74c83992-cfbc-11eb-b8bc-0242ac130003",
    review_book_id: "2a95459a-a929-11eb-bcbc-0242ac130002",
    review_date_finished: "test",
    review_rating: "1",
    review_favorite: "test",
    review_dislike: "test",
    review_takeaway: "test",
    review_notes: "test",
    review_recommend: true,
  };
  ReactDOM.render(
    <BrowserRouter>
      <Review {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
