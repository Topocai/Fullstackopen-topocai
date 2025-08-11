import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genres: [String!]) {
    allBooks(genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
