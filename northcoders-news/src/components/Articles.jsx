import React, { Component } from "react";
import * as api from "../api/utils";
class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.fetchArticles();
  }
  render() {
    return (
      <main>
        <h1>articles</h1>
      </main>
    );
  }
  fetchArticles = () => {
    api.getAllArticles("topics", "coding" ).then(articles => {
      this.setState({
        articles
      });
    });
  };
}

export default Articles;
