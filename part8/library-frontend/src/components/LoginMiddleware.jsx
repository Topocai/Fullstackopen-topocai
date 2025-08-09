import PropTypes from "prop-types";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const LoginMiddleware = (props) => {
  const nav = useNavigate();

  // back to login if user is not logged
  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken) {
      nav("/login");
    }
  });

  if (props.children == null) return;

  return <>{props.children}</>;
};

LoginMiddleware.propTypes = {
  children: PropTypes.object,
};

export default LoginMiddleware;
