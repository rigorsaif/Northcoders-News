import React, { Component } from "react";
import "./App.css";
import { Router } from "../node_modules/@reach/router";
import Articles from "./components/Articles";
import Auth from "./components/Auth";
import * as api from "./api/utils";
import Profile from "./components/Profile";

class App extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <div className="App">
        <Auth username={this.state.user} login={this.login}>
          <Profile signOut={this.signOut} user={this.state.user} />
          <Router className="articleContainer">
            <Articles path="/" user={this.state.user} />
            <Articles path="/articles/:slug/:id" user={this.state.user} />
            <Articles path="/articles/:slug" user={this.state.user} />
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

  signOut = () => {
    this.setState({
      user: null
    });
  };
}

export default App;
