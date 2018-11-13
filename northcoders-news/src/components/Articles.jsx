import React, { Component } from "react";
import * as api from "../api/utils";
import Nav from "./Nav";
import { Link } from "@reach/router";
class Articles extends Component {
  state = {
    articles: null
  };
  componentDidUpdate(prevProp) {
    if (this.props.slug !== prevProp.slug) {
      this.fetchArticles();
    }
  }
  componentDidMount() {
    this.fetchArticles();
  }
  render() {
    const { articles } = this.state;
    console.log(articles);
    return articles ? (
      <main>
        <Nav />
        <ul>
          {articles.map(article => (
            <li key={article._id}>
              <Link to={`articles/${article.belongs_to}/${article._id}`}>
                <h4>{article.title}</h4>
                <p>{article.body}</p>
                <h5>{article.created_by.username}</h5>
                <p>{article.created_at}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    ) : (
      "loading"
    );
  }
  fetchArticles = () => {
    const { slug } = this.props;
    let topic = null;
    if (slug) topic = "topics";
    api.getArticlesAndTopicsController(topic, slug).then(articles => {
      this.setState({
        articles
      });
    });
  };
}

export default Articles;
