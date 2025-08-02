const { books } = require("../index");

const definitions = `
    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]
        id: ID!
    }
`;
const queries = `bookCount: Int!\nallBooks: [Book!]!`;

const queryResolver = {
  bookCount: () => books.length,
  allBooks: () => books,
};

module.exports = { definitions, queries, queryResolver };
