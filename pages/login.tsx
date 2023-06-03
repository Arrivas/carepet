import React from "react";
import LoginComponent from "../components/login/LoginComponent";
import { checkAuth } from "../auth/useAuth";

const login = () => {
  checkAuth();
  return <LoginComponent />;
};

export default login;
