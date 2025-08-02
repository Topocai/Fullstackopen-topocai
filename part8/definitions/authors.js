const { authors, books } = require("../index");

const definitions = `
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }
`;

const queries = `authorCount: Int!\nallAuthors: [Author!]!`;

const queryResolver = {
  authorCount: () => authors.length,
  allAuthors: () => authors,
};

const Author = {
  bookCount: (root) =>
    books.reduce((count, book) => (count += book.author == root.name), 0),
};

module.exports = { definitions, queries, queryResolver, Author };
