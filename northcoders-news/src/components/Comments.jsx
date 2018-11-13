import React, { Component } from "react";
import * as api from "../api/utils";
import Button from "./Button";
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
                  <Button
                    name="->"
                    className="voteUp"
                    func={() => this.handleVotes(comment._id, "up")}
                  />
                  <p>{comment.votes}</p>
                  <Button
                    name="<-"
                    className="voteUp"
                    func={() => this.handleVotes(comment._id, "down")}
                  />
                  <p>{comment.created_at}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  handleVotes = (id, vote) => {
    api.patchCommentVotes(id, vote).then(comment => {
      const comments = this.state.comments.map(prevComment => {
        if (prevComment._id === comment._id) {
          return comment;
        } else {
          return prevComment;
        }
      });
      this.setState({ comments });
    });
  };
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments = () => {
    api.getArticleComments("5bd3234536161531614a9cf0").then(comments => {
      this.setState({
        comments
      });
    });
  };
}

export default Comments;
