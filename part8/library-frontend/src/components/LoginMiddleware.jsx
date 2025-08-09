import PropTypes from "prop-types";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

/**
 * Redirects to /login if user is not logged in (if user-token is not set in local storage)
 * or show children if user is logged in
 * @param {object} props.children - React component to render if user is logged in
 */
const LoginMiddleware = (props) => {
  const nav = useNavigate();

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
