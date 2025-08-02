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
const queries = `bookCount: Int!\nallBooks(author: String, genre: String): [Book!]!`;

const queryResolver = {
  bookCount: () => books.length,
  allBooks: (root, args) => {
    if (!args) {
      return books;
    }

    let filtered = books;
    if (args.author) {
      filtered = filtered.filter(
        (book) => book.author.toLowerCase() === args.author.toLowerCase()
      );
    }

    if (args.genre) {
      filtered = filtered.filter((book) => book.genres.includes(args.genre));
    }

    return filtered;
  },
};

module.exports = { definitions, queries, queryResolver };
