import React from "react";
import LoginPage from "./LoginPage";

const Auth = ({ children, username, login, error }) => {
  return username ? (
    children
  ) : (
    <LoginPage login={login} err={error ? error : null} />
  );
};

export default Auth;
