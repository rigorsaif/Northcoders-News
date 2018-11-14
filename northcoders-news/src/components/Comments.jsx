import React, { Component } from "react";
import * as api from "../api/utils";
import Vote from "./Vote";
import DeleteComment from "./DeleteComment";
class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    return (
      <>
        <ul className="commentsContainer">
          {this.state.comments.map(comment => {
            return (
              <li key={comment._id}>
                <div className="comment">
                  <h6>{comment.created_by.username}</h6>
                  <p>{comment.body}</p>
                  <Vote
                    section="comments"
                    id={comment._id}
                    votes={comment.votes}
                  />
                  {comment.created_by.username === this.props.user.username && (
                    <DeleteComment commentId={comment._id} />
                  )}
                  <p>{new Date(comment.created_at).toDateString()}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments = () => {
    api.getArticleComments(this.props.id).then(comments => {
      this.setState({
        comments
      });
    });
  };
  updateCommentsWhenPosting = newComment => {
    this.setState({ comments: [...this.state.comments, newComment] });
  };
}

export default Comments;
