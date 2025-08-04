import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS } from "./services/queries";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
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
