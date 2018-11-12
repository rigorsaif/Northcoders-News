import React, { Component } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { Router } from "../node_modules/@reach/router";
import Articles from "./components/Articles";

class App extends Component {
  state = {
    username: null,
    password: ""
  };
  render() {
    return <div className="App">
        {!this.state.username && <LoginPage handleSubmit={this.handleSubmit} />}
        <Router >
          <Articles path="/home" />
        </Router>
      </div>;
  }

  handleSubmit = (username, password) => {
    this.setState({
      username,
      password
    });
  };
}

export default App;
