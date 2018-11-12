import React, { Component } from "react";
import { Link } from "@reach/router";
import "./LoginPage.css";
class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <div className="container">
        <img src="" alt="" />
        <form
          method="post"
          action="http://localhost:3000/home"
          onSubmit={event => {
            const { handleSubmit } = this.props;
            const { username, password } = this.state;
            //event.preventDefault();
            handleSubmit(username, password);
          }}
        >
          <h4>Login</h4>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={this.handelChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handelChange}
          />
          <button>login</button>
        </form>
      </div>
    );
  }
  handelChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
}

export default LoginPage;
