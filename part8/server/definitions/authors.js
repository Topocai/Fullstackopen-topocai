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

    extend type Query {
        authorCount: Int!\nallAuthors: [Author!]!
    }

    extend type Mutation {
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
  Query: {
    authorCount: async () => AuthorModel.collection.countDocuments(),
    allAuthors: async () => AuthorModel.find({}).populate("books"),
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      if (!context.loggedUser) {
        throw new GraphQLError("Not logged in", {
          extensions: { code: "NOT_LOGGED_IN" },
        });
      }

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
  },
  Author: {
    bookCount: (root) =>
      Book.find({ author: root.id }).then((books) => books.length),
  },
};

module.exports = {
  definitions,
  resolvers,
};
