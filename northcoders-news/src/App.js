import React, { Component } from "react";
import "./App.css";
import { Link, Router } from "../node_modules/@reach/router";
import Articles from "./components/Articles";
import Auth from "./components/Auth";
import * as api from "./api/utils";
import Profile from "./components/Profile";
import Nav from "./components/Nav";

class App extends Component {
  state = {
    user: null
  };
  render() {
    return <div className="App">
        <div className="wholePage">
          <Auth username={this.state.user} login={this.login}>
            <Link to="/">
              <h2 className="btn btn-primary m-3">
                Home
              </h2>
            </Link>
            <Nav className="nav" />
            <Profile signOut={this.signOut} user={this.state.user} className="profile" />
            <Router className="articleContainer">
              <Articles path="/" user={this.state.user} />
              <Articles path="/articles/:slug/:id" user={this.state.user} />
              <Articles path="/articles/:slug" user={this.state.user} />
            </Router>
          </Auth>
        </div>
      </div>;
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
