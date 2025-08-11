import { isArray } from "@apollo/client/utilities";
import PropTypes from "prop-types";

const booksDisplay = (books) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {books.map((b) => (
        <tr key={b.title}>
          <td>{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const filterSection = (genres, selectedGenres, onSwitchGenre) => (
  <div>
    <header>○ Filter by genre</header>
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {Array.from(genres).map((g) => (
        <label key={g}>
          {g}
          <input
            key={g}
            type="checkbox"
            checked={selectedGenres.includes(g)}
            onChange={(e) => onSwitchGenre(e, g)}
          />
        </label>
      ))}
    </div>
  </div>
);

const Books = ({
  books, // book query object or an array of books
  genres,
  onSwitchGenre,
  hideFilters = false,
  selectedGenres = [],
}) => {
  if (isArray(books)) return booksDisplay(books); // if an array is passed, we just return a display for books

  if (books.loading)
    // if query is loading, we still displaying the filter section
    return (
      <section>
        <h2>books</h2>
        {!hideFilters && filterSection(genres, selectedGenres, onSwitchGenre)}
        <p>Loading</p>
      </section>
    );

  if (books.error) return <p>{books.error.message}</p>;

  if (books.data?.allBooks?.length === 0) return <p>No books</p>;

  return (
    <section>
      <h2>books</h2>
      {!hideFilters && filterSection(genres, selectedGenres, onSwitchGenre)}
      {booksDisplay(books.data?.allBooks)}
    </section>
  );
};

Books.propTypes = {
  books: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  genres: PropTypes.objectOf(Set),
  onSwitchGenre: PropTypes.func,
  hideFilters: PropTypes.bool,
  selectedGenres: PropTypes.array,
};

export default Books;
