const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");

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
  allAuthors: async () => AuthorModel.find({}).populate("books"),
};

const mutations = {
  editAuthor: async (root, args) => {
    const author = await AuthorModel.findOneAndUpdate(
      { name: args.name },
      { born: args.setBornTo },
      { new: true }
    );
    if (!author) {
      throw new GraphQLError("Author not found", {
        extensions: { code: "AUTHOR_NOT_FOUND" },
      });
    }
    return author.populate("books");
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
