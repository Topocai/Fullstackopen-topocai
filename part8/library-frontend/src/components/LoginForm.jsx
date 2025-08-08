import PropTypes from "prop-types";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLoginHandler }) => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // exit from login if we are already login
  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (userToken) {
      nav("/");
    }
  });

  if (!onLoginHandler) return null;

  return (
    <form onSubmit={(e) => onLoginHandler(e, username, password)}>
      <div>
        username
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        password
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLoginHandler: PropTypes.func,
};

export default LoginForm;
