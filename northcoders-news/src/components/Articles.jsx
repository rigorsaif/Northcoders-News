import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as api from "../api/utils";
import { Link } from "@reach/router";
import "./style/Articles.css";
import Comments from "./Comments";
import Vote from "./Vote";
import ArticleAdder from "./ArticleAdder";
import CommentAdder from "./CommentAdder";
class Articles extends Component {
  state = {
    articles: null,
    addArticle: false,
    addComment: false,
    newComment: false
  };
  componentDidUpdate(prevProp) {
    if (this.props.slug !== prevProp.slug || this.props.id !== prevProp.id) {
      this.fetchArticles();
    }
  }
  componentDidMount() {
    this.fetchArticles();
  }
  render() {
    const { slug } = this.props;
    const { articles, addArticle } = this.state;
    return articles ? (
      <main className="articleContainer">
        <div className="showcase">
          <ul className="articlesList">
            {slug && (
              <button
                onClick={this.toggleAddArticle}
                className="btn btn-outline-primary m-2"
              >
                add new
              </button>
            )}
            {addArticle && slug && (
              <ArticleAdder
                belongs_to={this.props.slug}
                created_by={this.props.user._id}
                updateArticlesWhenPosting={this.updateArticlesWhenPosting}
              />
            )}

            {articles.map(article => {
              if (articles.length > 1) {
                return (
                  <li key={article._id}>
                    <Link to={`/articles/${article.belongs_to}/${article._id}`}>
                      <h4>{article.title}</h4>
                    </Link>
                    <h5>Author: {article.created_by.username}</h5>
                    <Vote
                      votes={article.votes}
                      section={"articles"}
                      id={article._id}
                    />
                    <p className="btn btn-outline-warning m-2">
                      comments: {article.comment_count}
                    </p>
                    <p>{new Date(article.created_at).toDateString()}</p>
                  </li>
                );
              } else {
                return (
                  <li key={article._id}>
                    <Link to={`/articles/${article.belongs_to}/${article._id}`}>
                      <h4>{article.title}</h4>
                    </Link>
                    <p>{article.body}</p>
                    <h5>Author: {article.created_by.username}</h5>
                    <Vote
                      votes={article.votes}
                      section={"articles"}
                      id={article._id}
                    />
                    <p className="btn btn-outline-warning m-2">
                      comments: {article.comment_count}
                    </p>
                    <p>{new Date(article.created_at).toDateString()}</p>
                    <Comments
                      id={article._id}
                      user={this.props.user}
                      toggle={this.state.newComment}
                    />
                    <button
                      onClick={this.toggleAddComment}
                      className="btn btn-outline-primary m-2"
                    >
                      Add new comment
                    </button>
                    {this.state.addComment && (
                      <CommentAdder
                        belongs_to={article._id}
                        created_by={this.props.user._id}
                        toggleNewComment={this.toggleNewComment}
                      />
                    )}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </main>
    ) : (
      "loading"
    );
  }
  fetchArticles = () => {
    let { slug, id } = this.props;
    let topic = null;
    if (slug && !id) topic = "topics";
    if (id) slug = null;
    api.getArticlesAndTopicsController(topic, slug, id).then(articles => {
      this.setState({
        articles
      });
    });
  };

  toggleAddArticle = () => {
    this.setState({
      addArticle: !this.state.addArticle
    });
  };

  toggleAddComment = () => {
    this.setState({ addComment: !this.state.addComment });
  };
  updateArticlesWhenPosting = newArticle => {
    this.setState({
      articles: [newArticle, ...this.state.articles]
    });
  };

  toggleNewComment = () => {
    this.setState({ newComment: !this.state.newComment });
  };
}

export default Articles;
