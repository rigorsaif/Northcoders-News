import React from "react";
import * as api from "../api/utils";

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

export default DeleteComment;
