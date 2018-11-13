import React from "react";
import LoginPage from "./LoginPage";

const Auth = ({ children, username, login }) => {
  return username ? children : <LoginPage login={login} />;
};

export default Auth;
