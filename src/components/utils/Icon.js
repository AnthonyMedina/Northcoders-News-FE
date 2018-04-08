import React from "react";

const Icon = {
  upVote: () => (
    <svg
      id="i-chevron-top"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M30 20 L16 8 2 20" />
    </svg>
  ),
  downVote: () => (
    <svg
      id="i-chevron-bottom"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M30 12 L16 24 2 12" />
    </svg>
  )
};

export default Icon;
