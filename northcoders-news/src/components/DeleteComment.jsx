import React from "react";
import * as api from "../api/utils";
import PropTypes from "prop-types";

const DeleteComment = ({ commentId, toggle }) => {
  return (
    <div>
      <button
        onClick={() => {
          api.deleteComment(commentId).then(feedback => toggle());
        }}
        className="btn btn-outline-danger m-2"
      >
        Delete
      </button>
    </div>
  );
};
DeleteComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
};

export default DeleteComment;
