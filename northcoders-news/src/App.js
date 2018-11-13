import React, { Component } from "react";
import "./App.css";
import { Link, Router } from "../node_modules/@reach/router";
import Articles from "./components/Articles";
import Auth from "./components/Auth";
import * as api from "./api/utils";

class App extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <div className="App">
        <Auth username={this.state.user} login={this.login}>
          <Router>
            <Articles path="/" />
            <Articles path="/articles/:slug" />
          </Router>
        </Auth>
      </div>
    );
  }

  login = (userName, password) => {
    api.getUser(userName).then(userData => {
      const [user] = userData.user;
      this.setState({
        user
      });
    });
  };
}

export default App;
