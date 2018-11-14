import React from "react";
import * as api from "../api/utils";

const DeleteComment = ({ commentId }) => {
  return (
    <div>
      <button
        onClick={() => {
          api.deleteComment(commentId);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteComment;
