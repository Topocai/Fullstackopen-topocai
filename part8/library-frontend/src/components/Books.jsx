import PropTypes from "prop-types";
import { useState } from "react";

const Books = ({ books, filters = [] }) => {
  const [genresFilter, setGenresFilter] = useState([...filters]);

  const genres = new Set(books.flatMap((b) => b.genres));

  const onSwitchGenre = (e, genre) => {
    if (genresFilter.includes(genre)) {
      setGenresFilter(genresFilter.filter((g) => g !== genre));
    } else {
      setGenresFilter(genresFilter.concat(genre));
    }
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map(
            (book) =>
              (genresFilter.filter((g) => book.genres.includes(g)).length > 0 ||
                genresFilter.length === 0) && (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                  <td>{book.genres.join(", ")}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {filters.length === 0 && (
        <div>
          <h3>Filter by genre</h3>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {Array.from(genres).map((g) => (
              <label key={g}>
                {g}
                <input
                  key={g}
                  type="checkbox"
                  onChange={(e) => onSwitchGenre(e, g)}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.array,
  filters: PropTypes.array,
};

export default Books;
