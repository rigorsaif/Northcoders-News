import React from "react";
import LoginPage from "./LoginPage";
import PropTypes from "prop-types";

const Auth = ({ children, user, login, error }) => {

  return user ? (
    children
  ) : (
    <LoginPage login={login} err={error ? error : null} />
  );
};
Auth.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  error: PropTypes.bool,
  children: PropTypes.array.isRequired
};

export default Auth;
