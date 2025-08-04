import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation createBook(
    $authorName: String!
    $title: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $authorName
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const SET_AUTHOR = gql`
  mutation setAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
