const mongoose = require("mongoose");

const AuthorModel = require("../models/Author");
const Book = require("../models/Book");

const definitions = `
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        books: [Book!]
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
  authorCount: async () => AuthorModel.collection.countDocuments(),
  allAuthors: () => AuthorModel.find({}),
};

const mutations = {
  editAuthor: (root, args) => {
    /*
    const author = authors.find((author) => author.name === args.name);
    if (author != undefined) author.born = args.setBornTo;
    return author;*/
  },
};

const Author = {
  bookCount: (root) =>
    Book.find({ author: root.id }).then((books) => books.length),
};

module.exports = {
  definitions,
  queries,
  queryResolver,
  Author,
  mutationsDef,
  mutations,
};
