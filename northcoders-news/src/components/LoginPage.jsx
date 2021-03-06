import React, { Component } from "react";
import "./style/LoginPage.css";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
class LoginPage extends Component {
  state = {
    username: "jessjelly",
    password: "88888855555"
  };
  render() {
    const { err } = this.props;
    return <div className="loginContainer">
        <img className="logo" src="https://i.imgur.com/JO46Eiu.png" alt="Northcoders logo" />
        <form className="loginForm" method="post" onSubmit={event => {
            event.preventDefault();
            const { login } = this.props;
            const { username, password } = this.state;
            login(username, password);
          }}>
          <h4>Login</h4>
          <label htmlFor="username" className="userName">
            Username
          </label>
          <input value={this.state.username} type="text" name="username" id="username" onChange={this.handelChange} className={err ? "loginError" : null} required />
          <br />
          <label htmlFor="password" className="password">
            Password
          </label>
          <input value={this.state.password} type="password" name="password" id="password" onChange={this.handelChange} />
          <br />
          <button className="btn btn-outline-warning ">login</button>
          {err && <h5>invalid Username or Password</h5>}
        </form>
      </div>;
  }
  componentDidUpdate(prevProp) {
    if (prevProp.err !== this.props.err) {
      this.setState();
    }
  }
  handelChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
}
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  err: PropTypes.bool
};

export default LoginPage;
