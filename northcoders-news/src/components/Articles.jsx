import React, { Component } from "react";
import * as api from "../api/utils";
import Nav from "./Nav";
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
    addComment: false
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
    const { articles, addArticle } = this.state;
    return articles ? (
      <main className="articleContainer">
        <Nav />
        <div className="showcase">
          <ul className="articlesList">
            <button onClick={this.toggleAddArticle}>add new</button>
            {addArticle && (
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
                    <p>comments: {article.comment_count}</p>
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
                    <p>comments: {article.comment_count}</p>
                    <Comments id={article._id} user={this.props.user} />
                    <p>{new Date(article.created_at).toDateString()}</p>
                    <button onClick={this.toggleAddComment}>
                      Add new comment
                    </button>
                    {this.state.addComment && (
                      <CommentAdder
                        belongs_to={article._id}
                        created_by={this.props.user._id}
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
}

export default Articles;
