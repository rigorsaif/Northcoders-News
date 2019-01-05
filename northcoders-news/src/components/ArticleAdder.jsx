import React, { Component } from "react";
import * as api from "../api/utils";
import PropTypes from "prop-types";
import "./style/ArticleAdder.css";
class ArticleAdder extends Component {
  state = {
    title: "",
    body: "",
    belongs_to: "",
    created_by: ""
  };
  render() {
    return (
      <div className="articleAdder">
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Enter title </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={this.handleChange}
            value={this.state.title}
            required
          />
          <br />
          <label htmlFor="body">your article </label> <br />
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            onChange={this.handleChange}
            value={this.state.body}
            required
          />
          <button className="btn btn-outline-success">Submit</button>
        </form>
      </div>
    );
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
ArticleAdder.propTypes = {
  belongs_to: PropTypes.string.isRequired,
  created_by: PropTypes.string.isRequired
};
export default ArticleAdder;
