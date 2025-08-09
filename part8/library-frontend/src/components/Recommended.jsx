import PropTypes from "prop-types";

import LoginMiddleware from "./LoginMiddleware";
import Books from "./Books";

const Recommended = ({ books, user }) => {
  if (!user) return null;
  if (!books) return <p>no books</p>;

  return (
    <LoginMiddleware>
      <div>
        <h2>Recommended for {user.username}</h2>
        <header>favorite genre: {user.favoriteGenre}</header>
        <Books books={books} filters={[user.favoriteGenre]}></Books>
      </div>
    </LoginMiddleware>
  );
};

Recommended.propTypes = {
  books: PropTypes.array,
  user: PropTypes.object,
};

export default Recommended;
