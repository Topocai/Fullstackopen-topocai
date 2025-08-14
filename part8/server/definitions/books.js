const mongoose = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");

const definitions = `
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]
        id: ID!
    }

    extend type Query {
      bookCount: Int!\nallBooks(author: String, genres: [String]): [Book!]!
    }

    extend type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book!
    }

    extend type Subscription {
        bookAdded: Book!
    }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args) {
        return Book.find({});
      }

      // Create a filters object that holds and expand by arguments
      // then used to directly filter find books method with mongoose
      let filters = {};
      if (args.author) {
        // Author filter, searchs for author, and if it doesn't exists cancel the query
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        filters.author = author._id;
      }
      if (args.genres) filters.genres = { $in: [...args.genres] };

      return Book.find(filters).populate("author");
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.loggedUser) {
        throw new GraphQLError("Not logged in", {
          extensions: { code: "NOT_LOGGED_IN" },
        });
      }

      let author = await Author.findOne({ name: args.author }).populate(
        "books"
      );

      // We need to check if the author is currently existing, if is not create a new one using the name passed
      // and add the book to the new author, or just add the ID of the existing author that was found

      if (!author) {
        author = new Author({ name: args.author });
        try {
          (await author.save()).populate("books");
        } catch (error) {
          throw new GraphQLError("Error adding book", {
            extensions: {
              code: "NEW_AUTHOR_ERROR",
              message: error.message,
              error,
            },
          });
        }
      }

      const book = await new Book({ ...args, author: author._id }).populate(
        "author"
      );

      // Save the book and handle errors
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Error adding book", {
          extensions: {
            code: "BOOK_SAVING_ERROR",
            message: error.message,
            error,
          },
        });
      }

      // Updates the author data with the new book
      // if it fails, delete the book
      try {
        author.books = [...author.books, book._id];
        author.bookCount = author.books.length;
        await author.save();
      } catch (error) {
        Book.deleteOne({ _id: book._id });
        throw new GraphQLError("Error adding book", {
          extensions: {
            code: "AUTHOR_SAVING_ERROR",
            message: error.message,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = {
  definitions,
  resolvers,
};
