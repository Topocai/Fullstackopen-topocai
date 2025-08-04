const { authors, books } = require("../index");

const definitions = `
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }
`;

const mutationsDef = `
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
`;

const queries = `authorCount: Int!\nallAuthors: [Author!]!`;

const queryResolver = {
  authorCount: () => authors.length,
  allAuthors: () => authors,
};

const mutations = {
  editAuthor: (root, args) => {
    const author = authors.find((author) => author.name === args.name);
    if (author != undefined) author.born = args.setBornTo;
    return author;
  },
};

const Author = {
  bookCount: (root) =>
    books.reduce((count, book) => (count += book.author == root.name), 0),
};

module.exports = {
  definitions,
  queries,
  queryResolver,
  Author,
  mutationsDef,
  mutations,
};
