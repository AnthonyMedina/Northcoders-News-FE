import React from "react";
import PropTypes from "prop-types";

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

DeleteButton.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  deleteComment: PropTypes.func.isRequired
};

export default DeleteButton;
