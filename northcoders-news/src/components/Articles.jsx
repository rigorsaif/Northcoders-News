import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as api from "../api/utils";
import { Link } from "@reach/router";
import "./style/Articles.css";
import Comments from "./Comments";
import Vote from "./Vote";
import ArticleAdder from "./ArticleAdder";
import CommentAdder from "./CommentAdder";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 50
  }
});
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
    const { slug, classes } = this.props;
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
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <Link
                          to={`/articles/${article.belongs_to}/${article._id}`}
                        >
                          <h4 style={{ textAlign: "center" }}>
                            {article.title}
                          </h4>
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <h6>
                          By:{" "}
                          {article.created_by.username.toUpperCase() ||
                            this.props.user.username.toUpperCase()}
                        </h6>
                      </Grid>
                      <Grid item xs={6}>
                        <Vote
                          votes={article.votes}
                          section={"articles"}
                          id={article._id}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "right", display: "block" }}>
                          <Link
                            to={`/articles/${article.belongs_to}/${
                              article._id
                            }`}
                          >
                            <p className="btn btn-outline-warning m-2">
                              comments: {article.comment_count}
                            </p>
                          </Link>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <p>{new Date(article.created_at).toDateString()}</p>
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ textAlign: "right", display: "block" }}>
                          <p>
                            tags:
                            <Link to={`/articles/${article.belongs_to}/`}>
                              {" "}
                              {article.belongs_to}
                            </Link>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </li>
                );
              } else {
                return (
                  <li key={article._id}>
                    <Grid container spacing={24}>
                    <Grid item xs={12}>
                          <h4 style={{ textAlign: "center" }}>{article.title}</h4>
                    </Grid>
                    <Grid item xs={12}>
                    <p>{article.body}</p>
                    </Grid>
                      <Grid item xs={12}>
                    <h6>
                      By:{" "}
                      {article.created_by.username || this.props.user.username}
                    </h6>
                    </Grid>
                      <Grid item xs={6}>
                    <Vote
                      votes={article.votes}
                      section={"articles"}
                      id={article._id}
                    />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ textAlign: "right", display: "block" }}>
                            <p className="btn btn-outline-warning m-2">
                              comments: {article.comment_count}
                            </p>
                        </div>
                    </Grid>
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
                    </Grid>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </main>
    ) : (
      <CircularProgress className={classes.progress} color="secondary" />
    );
  }
  fetchArticles = () => {
    let { slug, id, navigate } = this.props;
    let topic = null;
    if (slug && !id) topic = "topics";
    if (id) slug = null;
    api
      .getArticlesAndTopicsController(topic, slug, id)
      .then(articles => {
        this.setState({
          articles
        });
      })
      .catch(err =>
        navigate("/error", {
          state: {
            status: 404,
            msg: "Page not found"
          }
        })
      );
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
Articles.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string,
  slug: PropTypes.string
};

export default withStyles(styles)(Articles);
