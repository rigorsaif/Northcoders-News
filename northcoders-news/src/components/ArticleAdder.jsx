import React, { Component } from "react";
import * as api from "../api/utils";
class ArticleAdder extends Component {
  state = {
    title: "",
    body: "",
    belongs_to: "",
    created_by: ""
  };
  render() {
    return <div>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Enter title </label>
          <input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title} />
          <br />
          <label htmlFor="body">your article </label> <br />
          <textarea name="body" id="body" cols="30" rows="10" onChange={this.handleChange} value={this.state.body} />
          <button className="btn btn-outline-success">Submit</button>
        </form>
      </div>;
  }
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
    const { updateArticlesWhenPosting } = this.props;
    event.preventDefault();
    api.postArticle(this.state).then(({ article }) => {
      updateArticlesWhenPosting(article);
      this.setState({
        title: "",
        body: "",
        belongs_to: "",
        created_by: ""
      });
    });
  };
}

export default ArticleAdder;
