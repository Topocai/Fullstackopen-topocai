import PropTypes from "prop-types";

import { useState } from "react";

import { SET_AUTHOR } from "../services/mutations";
import { ALL_AUTHORS } from "../services/queries";
import { useMutation } from "@apollo/client";

import LoginMiddleware from "./LoginMiddleware";

const AuthorForm = ({ author }) => {
  const [setAuthor, { data, error }] = useMutation(SET_AUTHOR, {
    onError: (error) => {
      console.error("Error when updating author:", error);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [born, setBornTo] = useState("");

  if (!author) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("edit author");
    setAuthor({ variables: { name: author, setBornTo: parseInt(born) } });

    setBornTo("");
  };

  return (
    <LoginMiddleware>
      <div>
        <h2>Editing {author}</h2>
        {data && data?.editAuthor == null && (
          <p>Author not found, case sensitive</p>
        )}
        {error && (
          <div>
            <p>Invalid inputs!</p>
          </div>
        )}
        {data && data?.editAuthor && (
          <p>
            {data.editAuthor.name} updated: {data.editAuthor.born}
          </p>
        )}
        <form onSubmit={submit}>
          <div>
            birthyear
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBornTo(target.value)}
            />
          </div>
          <button type="submit">create book</button>
        </form>
      </div>
    </LoginMiddleware>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.string,
};

export default AuthorForm;
