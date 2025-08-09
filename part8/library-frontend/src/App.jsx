import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import "./App.css";

import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery, useMutation, useApolloClient } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS } from "./services/queries";
import { LOGIN } from "./services/mutations";

const App = () => {
  const apolloClient = useApolloClient();

  const [userToken, setUserToken] = useState(
    localStorage.getItem("user-token")
  );

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification !== null)
      setInterval(() => {
        setNotification(null);
      }, 5000);
  }, [notification]);

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Error when logging in: ", error);
      setNotification(`${error.message}`);
    },
  });

  // execute at login and save token to storage and application
  useEffect(() => {
    if (data) {
      localStorage.setItem("user-token", data.login.value);
      setUserToken(data.login.value);
    }
  }, [data]);

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const onLoginHandler = (e, username, password) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setUserToken(null);
    apolloClient.resetStore();
    localStorage.removeItem("user-token");
  };
  return (
    <>
      <Router>
        <div>
          <div>
            <Link className="tab-element" to="/books">
              books
            </Link>
            <Link className="tab-element" to="/authors">
              authors
            </Link>
            {userToken && (
              <Link className="tab-element" to="/addBook">
                add book
              </Link>
            )}

            {!userToken && (
              <Link className="tab-element" to="/login">
                Login
              </Link>
            )}
            {userToken && (
              <button
                className="tab-element"
                onClick={logoutHandler}
                type="button"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <span>{notification}</span>
        <Routes>
          <Route
            path="/books"
            element={
              <>{books.data && <Books books={books.data?.allBooks} />}</>
            }
          />
          <Route
            path="/authors"
            element={
              <>
                {authors.data && <Authors authors={authors.data?.allAuthors} />}
              </>
            }
          />
          <Route path="/addBook" element={<NewBook />} />
          <Route
            path="/login"
            element={<LoginForm onLoginHandler={onLoginHandler} />}
          />
          <Route path="/" element={<></>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
