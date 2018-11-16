import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api/utils";
import "./style/Nav.css";
class Nav extends Component {
  state = {
    topics: null
  };
  render() {
    const { topics } = this.state;
    return topics ? (
      <ul className="topicMenu">
        <li>
          {" "}
          <h2 className="btn btn-primary">Topics</h2>
          <ul>
            {this.state.topics.map(topic => {
              return (
                <Link to={`/articles/${topic.slug}`} key={topic._id}>
                  <li className="btn btn-outline-primary">{topic.slug}</li>
                </Link>
              );
            })}
          </ul>
        </li>
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
