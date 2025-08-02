const { books, authors } = require("../index");

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

const mutationsDef = `
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!
`;

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

const mutations = {
  addBook: (root, args) => {
    const book = { ...args, id: (books.length + 1).toString() };
    books.push(book);

    if (authors.find((author) => author.name === book.author) === undefined) {
      const author = { name: book.author, id: (authors.length + 1).toString() };
      authors.push(author);
    }

    return book;
  },
};

module.exports = {
  definitions,
  queries,
  queryResolver,
  mutationsDef,
  mutations,
};
