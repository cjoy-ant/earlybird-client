const STORE = {
  books: [
    {
      book_id: "0a33587e-c4a8-11eb-8529-0242ac130003",
      book_title: "The Body Keeps the Score",
      book_author: "Bessel Van der Kolk MD",
      book_genre: "Self-Help",
      book_date_started: "3-15-2017",
      book_finished: false,
      book_date_modified: "3-15-2021",
    },
    {
      book_id: "a05abb3a-c4a8-11eb-8529-0242ac130003",
      book_title: "The Life Changing Magic of Tidying Up",
      book_author: "Marie Kondo",
      book_genre: "Self-help",
      book_date_started: "01-30-2021",
      book_finished: true,
      book_date_modified: "01-30-2021",
    },
    {
      book_id: "0d7c1700-c4a8-11eb-8529-0242ac130003",
      book_title: "Milk and Honey",
      book_author: "Rupi Kaur",
      book_genre: "Poetry",
      book_date_started: "08-20-2020",
      book_finished: true,
      book_date_modified: "08-20-2020",
    },
    {
      book_id: "1038017a-c4a8-11eb-8529-0242ac130003",
      book_title: "The Wind Up Bird Chronicle",
      book_author: "Haruki Murakami",
      book_genre: "Psychological Fiction",
      book_date_started: "12-10-2018",
      book_finished: true,
      book_date_modified: "12-10-2018",
    },
  ],
  entries: [
    {
      entry_id: "ba08ea38-c4a9-11eb-8529-0242ac130003",
      entry_book_id: "0a33587e-c4a8-11eb-8529-0242ac130003",
      entry_title: "Trauma and dissociation",
      entry_category: "Quote",
      entry_chapters: "3",
      entry_pages: "97",
      entry_quote:
        "Traumatized people chronically feel unsafe inside their bodies: The past is alive in the form of gnawing interior discomfort. Their bodies are constantly bombarded by visceral warning signs, and, in an attempt to control these processes, they often become expert at ignoring their gut feelings and in numbing awareness of what is played out inside. They learn to hide from their selves.",
      entry_notes: "",
      entry_date_modified: "03-20-2017",
    },
    {
      entry_id: "cf71a32e-c4a9-11eb-8529-0242ac130003",
      entry_book_id: "a05abb3a-c4a8-11eb-8529-0242ac130003",
      entry_title: "KonMari Method",
      entry_category: "Notes",
      entry_chapters: "4",
      entry_pages: "30-40",
      entry_quote: "",
      entry_notes:
        "1. Clothing 2. Books 3. Papers 4. Komono (Miscellaneous) 5. Sentimental Items",
      entry_date_modified: "02-9-2021",
    },
    {
      entry_id: "2ca62a64-c4ab-11eb-8529-0242ac130003",
      entry_book_id: "a05abb3a-c4a8-11eb-8529-0242ac130003",
      entry_title: "Does it SPARK JOY?",
      entry_category: "Notes",
      entry_chapters: "2",
      entry_pages: "21-25",
      entry_quote:
        "If an item doesn't spark joy, express your gratitude for what it was able to offer you, then let it go.",
      entry_notes: "",
      entry_date_modified: "02-7-2021",
    },
    {
      entry_id: "18e05018-c4ab-11eb-8529-0242ac130003",
      entry_book_id: "0d7c1700-c4a8-11eb-8529-0242ac130003",
      entry_title: "On body shaming and bodily autonomy",
      entry_category: "Quote",
      entry_chapters: "2",
      entry_pages: "24",
      entry_quote: "other women's bodies are not our battlegrounds",
      entry_notes:
        "Why do men make decisions regarding women's health and our bodies???",
      entry_date_modified: "08-21-2020",
    },
    {
      entry_id: "d5ba47ae-c4a9-11eb-8529-0242ac130003",
      entry_book_id: "1038017a-c4a8-11eb-8529-0242ac130003",
      entry_title: "Passion",
      entry_category: "Quote",
      entry_chapters: "6",
      entry_pages: "110",
      entry_quote: `"Here's what I think, Mr. Wind-Up Bird," said May Kasahara. "Everybody's born with some different thing at the core of their existence. And that thing, whatever it is, becomes like a heat source that runs each person from the inside. I have one too, of course. Like everybody else. But sometimes it gets out of hand. It swells or shrinks inside me, and it shakes me up. What I'd really like to do is find a way to communicate that feeling to another person. But I can't seem to do it. They just don't get it. Of course, the problem could be that I'm not explaining it very well, but I think it's because they're not listening very well. They pretend to be listening, but they're not, really. So I get worked up sometimes, and I do some crazy things."`,
      entry_notes: "I love how introsepctive this young girl is.",
      entry_date_modified: "12-21-2018",
    },
  ],
  reviews: [
    {
      review_id: "3dcc885e-c723-11eb-b8bc-0242ac130003",
      review_book_id: "1038017a-c4a8-11eb-8529-0242ac130003",
      review_rating: "5",
      review_favorite: "I like how imaginative the book is",
      review_dislike:
        "it is a very long read, and sometimes difficult to follow as they skip between time periods quite frequently",
      review_takeaway: "",
      review_notes: "not my favorite Murakami book",
      review_recommend: false,
    },
    {
      review_id: "444c4534-c723-11eb-b8bc-0242ac130003",
      review_book_id: "0d7c1700-c4a8-11eb-8529-0242ac130003",
      review_rating: "8",
      review_favorite:
        "I enjoy that the poems are simple, but impactful. As a woman of color myself, I resonate with a lot of the emotion and stories behind the poetry.",
      review_dislike: "",
      review_takeaway: "",
      review_notes: "",
      review_recommend: true,
    },
    {
      review_id: "47476f8e-c723-11eb-b8bc-0242ac130003",
      review_book_id: "a05abb3a-c4a8-11eb-8529-0242ac130003",
      review_rating: "7",
      review_favorite:
        "I think that the KonMari method will be very useful for purging clothes and papers since those especially tend to get hoarded.",
      review_dislike: "",
      review_takeaway:
        "Only buy and keep that which really makes you truly happy.",
      review_notes: "",
      review_recommend: true,
    },
  ],
};

export default STORE;
