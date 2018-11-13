import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api/utils";
class Nav extends Component {
  state = {
    topics: null
  };
  render() {
    const { topics } = this.state;
    return topics ? (
      <ul>
        {this.state.topics.map(topic => {
          return (
            <Link to={`/articles/${topic.slug}`} key={topic._id}>
              <li>{topic.slug}</li>
            </Link>
          );
        })}
      </ul>
    ) : (
      <h1>laoding</h1>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  fetchTopics = () => {
    api.getAllTopics().then(topics => {
      this.setState({
        topics
      });
    });
  };
}

export default Nav;
