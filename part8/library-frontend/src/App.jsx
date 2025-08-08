import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS } from "./services/queries";
import { LOGIN } from "./services/mutations";

const App = () => {
  const [userToken, setUserToken] = useState(null);

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Error when logging in: ", error);
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

  if (!userToken) return <LoginForm onLoginHandler={onLoginHandler} />;

  return (
    <>
      <Router>
        <div>
          <div>
            <Link to="/books">books </Link>
            <Link to="/authors">authors </Link>
            <Link to="/addBook">add book</Link>
          </div>
        </div>
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
          <Route path="/" element={<></>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
