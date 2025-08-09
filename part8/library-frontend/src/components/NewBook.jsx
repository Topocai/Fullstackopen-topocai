import { useState } from "react";

import { CREATE_BOOK } from "../services/mutations";
import { ALL_BOOKS } from "../services/queries";
import { useMutation } from "@apollo/client";

import LoginMiddleware from "./LoginMiddleware";

const NewBook = () => {
  const [createBook, { error }] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.error("Error when creating book:", error);
    },
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    createBook({
      variables: {
        title,
        authorName: author,
        published: parseInt(published),
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <LoginMiddleware>
      <div>
        {error && <p>{error.graphQLErrors[0]?.message}</p>}
        {error && <p>{error.graphQLErrors[0]?.extensions?.message}</p>}
        <form onSubmit={submit}>
          <div>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </div>
          <div>
            Genres
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>
            <header>genres: {genres.join(" ")}</header>
          </div>
          <button type="submit">create book</button>
        </form>
      </div>
    </LoginMiddleware>
  );
};

export default NewBook;
