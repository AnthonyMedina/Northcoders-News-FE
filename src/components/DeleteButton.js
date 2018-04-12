import React from "react";
// import PT from 'prop-types';]

const DeleteButton = ({ comment, deleteComment }) => {
  const handleClick = e => {
    deleteComment(comment._id);
  };
  return (
    <div className="d-flex flex-row-reverse w-100">
      <button className="btn btn-danger" onClick={handleClick}>
        <i className="fas fa-trash-alt" />
      </button>
    </div>
  );
};

export default DeleteButton;
