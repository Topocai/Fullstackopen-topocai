import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import "./App.css";

import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery, useMutation, useApolloClient } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER } from "./services/queries";
import { LOGIN } from "./services/mutations";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  /*
    Login user management, we use apolloClient just for reset cache data when user is loggout
    first we create a mutation for login that invalidates CURRENT_USER cache data
    also use setNotification to show errors such as invalid username or password

    with an effect hook we save the token to localstorage and application state during runtime,
    this effect is perform via login mutation,
  */
  const apolloClient = useApolloClient();

  // save user token to application state
  const [userToken, setUserToken] = useState(
    localStorage.getItem("user-token")
  );

  const user = useQuery(CURRENT_USER, {
    skip: !localStorage.getItem("user-token"),
  });

  // create login mutation
  const [login, userResponse] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Error when logging in: ", error);
      setNotification(`${error.message}`);
    },
  });

  // execute at login and save token to storage and application
  useEffect(() => {
    if (userResponse.data) {
      localStorage.setItem("user-token", userResponse.data.login.value);
      setUserToken(userResponse.data.login.value);
      // Make sure that user info is updated in data when logging in
      user.refetch();
    }
  }, [userResponse.data, apolloClient, user]);

  // perform login by user input
  const onLoginHandler = (e, username, password) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  // perform logout by user input
  // we also remove token from all data (cache, state and storage)
  const logoutHandler = (e) => {
    e.preventDefault();
    setUserToken(null);
    apolloClient.resetStore();
    localStorage.removeItem("user-token");
  };

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification !== null)
      setInterval(() => {
        setNotification(null);
      }, 5000);
  }, [notification]);
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

            {userToken && (
              <Link className="tab-element" to="/recomendation">
                Recommendations
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
            path="/recomendation"
            element={
              <>
                {books.data && user.data?.me && (
                  <Recommended
                    books={books.data?.allBooks}
                    user={user.data?.me}
                  />
                )}
              </>
            }
          />
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
