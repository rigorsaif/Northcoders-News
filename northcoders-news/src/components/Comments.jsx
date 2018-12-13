import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api/utils";
import Vote from "./Vote";
import DeleteComment from "./DeleteComment";
import "./style/Comments.css";

class Comments extends Component {
  state = {
    comments: [],
    delete: false
  };
  render() {
    const { username } = this.props.user;
    return (
      <>
        <ul className="commentsContainer">
          {this.state.comments.map(comment => {
            return (
              <li key={comment._id}>
                <div className="comment">
                  <img
                    src={comment.created_by.avatar_url}
                    alt="avatar"
                    className="commentAvatar"
                  />
                  <h6>{comment.created_by.username.toUpperCase()}</h6>
                  <p>{comment.body}</p>
                  <Vote
                    section="comments"
                    id={comment._id}
                    votes={comment.votes}
                  />
                  {comment.created_by.username === username && (
                    <DeleteComment
                      commentId={comment._id}
                      toggle={this.toggleDelete}
                    />
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
  componentDidUpdate(prevProp, prevState) {
    if (
      prevProp.toggle !== this.props.toggle ||
      prevState.delete !== this.state.delete
    ) {
      this.fetchComments();
    }
  }
  fetchComments = () => {
    api
      .getArticleComments(this.props.id)
      .then(comments => {
        this.setState({ comments });
      })
      .catch(err => this.props.navigate("/error"));
  };
  updateCommentsWhenPosting = newComment => {
    this.setState({ comments: [...this.state.comments, newComment] });
  };
  toggleDelete = () => {
    this.setState({
      delete: !this.state.delete
    });
  };
}
Comments.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.string
};

export default Comments;
