import React, { Component } from "react";
import "./LoginPage.css";
class LoginPage extends Component {
  state = {
    username: "jessjelly",
    password: "888888"
  };
  render() {
    return (
      <div className="loginContainer">
        <img className="logo"
          src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png"
          alt="Northcoders logo"
        />
        <form
          className="loginForm"
          method="post"
          onSubmit={event => {
            event.preventDefault();
            const { login } = this.props;
            const { username, password } = this.state;
            login(username, password);
          }}
        >
          <h4>Login</h4>
          <label htmlFor="username" className="userName">
            Username
          </label>
          <input
            value={this.state.username}
            type="text"
            name="username"
            id="username"
            onChange={this.handelChange}
          /><br />
          <label htmlFor="password" className="password">
            Password
          </label>
          <input
            value={this.state.password}
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
