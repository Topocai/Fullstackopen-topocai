import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import "./App.css";

import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery, useMutation, useApolloClient } from "@apollo/client";

import {
  ALL_AUTHORS,
  CURRENT_USER,
  ALL_BOOKS,
  ALL_BOOKS_BY_GENRE,
} from "./services/queries";
import { LOGIN } from "./services/mutations";

const App = () => {
  const apolloClient = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);

  //===================================================[ BOOK MANAGEMENT ]==================================================

  /**
   * Keeps track of selected genres by user and all genres existing on database during application runtime
   * Define two queries, one for all books and one for all filtered books, using all books query
   * we get and update allGenres set
   */
  const [genresFilter, setGenresFilter] = useState([]);
  const [allGenres, setAllGenres] = useState(new Set([]));

  const filteredBooks = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genres: genresFilter.length > 0 ? genresFilter : null },
  });

  const allBooks = useQuery(ALL_BOOKS);

  const onSwitchGenre = (e, genre) => {
    // Function that switchs the state of a genre in filters
    // if it already exists in filters, remove it, else add
    // then we refetch filteres books
    if (genresFilter.includes(genre)) {
      setGenresFilter(genresFilter.filter((g) => g !== genre));
    } else {
      setGenresFilter(genresFilter.concat(genre));
    }

    filteredBooks.refetch();
  };

  useEffect(() => {
    // Make sure that we update allGenres set during runtime when we fetch all books
    if (allBooks.data) {
      const fetchedGenres = new Set(
        allBooks.data.allBooks.flatMap((b) => b.genres)
      );
      setAllGenres((prev) => prev.union(fetchedGenres));
    }
  }, [allBooks.data]);

  const onNewBook = (book) => {
    // Hard-write the new book in cache if has at least one genre in filter
    // to work, it is defined in typePolicies at apolloClient cache declaration, see main.jsx
    // manual writing to ALL_BOOKS is not needed because it works with refetchQuery at mutation
    if (book.genres.filter((g) => genresFilter.includes(g)).length > 0) {
      apolloClient.writeQuery({
        query: ALL_BOOKS_BY_GENRE,
        data: {
          allBooks: [book],
        },
        variables: { genres: genresFilter },
      });
    }
  };

  //===================================================[ BOOK MANAGEMENT ]==================================================

  //===================================================[ LOGIN USER MANAGEMENT ]==================================================

  /*
    Login user management, we use apolloClient just for reset cache data when user is loggout
    first we create a mutation for login that invalidates CURRENT_USER cache data
    also use setNotification to show errors such as invalid username or password

    with an effect hook we save the token to localstorage and application state during runtime,
    this effect is perform via login mutation,
  */

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

  //===================================================[ LOGIN USER MANAGEMENT ]==================================================

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
              <>
                {
                  <Books
                    books={filteredBooks}
                    genres={allGenres}
                    onSwitchGenre={onSwitchGenre}
                    selectedGenres={genresFilter}
                  />
                }
              </>
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
          <Route
            path="/addBook"
            element={<NewBook onNewBookAdded={onNewBook} />}
          />
          <Route
            path="/recomendation"
            element={
              <>
                {filteredBooks.data && user.data?.me && (
                  <Recommended
                    books={allBooks.data?.allBooks}
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
