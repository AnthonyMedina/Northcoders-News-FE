import React from "react";

const Icon = {
  upVote: ({ changeVote = console.log, article_id }) => (
    <svg
      id="up"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      onClick={changeVote.bind(this, article_id, "up")}
    >
      <path d="M30 20 L16 8 2 20" />
    </svg>
  ),
  downVote: ({ changeVote = console.log, article_id }) => (
    <svg
      id="down"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      onClick={changeVote.bind(this, article_id, "down")}
    >
      <path d="M30 12 L16 24 2 12" />
    </svg>
  )
};

export default Icon;
