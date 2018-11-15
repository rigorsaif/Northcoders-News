import React, { Component } from "react";
import * as api from "../api/utils";
class CommentAdder extends Component {
  state = {
    body: "",
    belongs_to: "",
    created_by: ""
  };
  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            onChange={this.handleChange}
            value={this.state.body}
          >
            add comment
          </textarea>
          <button className="btn btn-outline-success m-2">post</button>
        </form>
      </div>
    );
  }
  // it needs belongs_to (article id) and created_by (user_id)

  handleChange = event => {
    const { belongs_to, created_by } = this.props;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      belongs_to,
      created_by
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    api.postArticleComments(this.state).then(article => {
      const { toggleNewComment } = this.props;
      this.setState({ body: "", belongs_to: "", created_by: "" }, () =>
        toggleNewComment()
      );
    });
  };
}

export default CommentAdder;
