import React, { Component } from "react";
import "./App.css"
import { Link, Router } from "../node_modules/@reach/router";
import Articles from "./components/Articles";
import Auth from "./components/Auth";
import * as api from "./api/utils";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import Errors from "./components/Errors";
import FullScreenDialog from "./components/ProfileSlider";
import PrimarySearchAppBar from "./components/NewNav";

class App extends Component {
  state = {
    user: null,
    error: null
  };
  render() {
    return (
      <div className="App">
        <div className="wholePage">
          <Auth
            user={this.state.user}
            login={this.login}
            error={this.state.error}
          >
            {/* <Nav className="nav" /> */}
            <PrimarySearchAppBar user={this.state.user}/>
            {/* <FullScreenDialog
              signOut={this.signOut}
              user={this.state.user}
              className="profile"
            /> */}
            {/* <Profile
              signOut={this.signOut}
              user={this.state.user}
              className="profile"
            /> */}
            <Router className="articleContainer">
              <Articles path="/" user={this.state.user} />
              <Articles path="/articles/:slug/:id" user={this.state.user} />
              <Articles path="/articles/:slug" user={this.state.user} />
              <Errors path="/error" />
            </Router>
          </Auth>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("userData"))
    });
  }

  login = userName => {
    api
      .getUser(userName)
      .then(userData => {
        const [user] = userData.user;
        localStorage.setItem("userData", JSON.stringify(user));
        this.setState({
          user,
          error: null
        });
      })
      .catch(err =>
        this.setState({
          error: err
        })
      );
  };

  signOut = () => {
    localStorage.removeItem("userData");
    this.setState({
      user: null
    });
  };
}

export default App;
