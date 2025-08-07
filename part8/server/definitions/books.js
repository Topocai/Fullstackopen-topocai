const mongoose = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

const { GraphQLError } = require("graphql");

const definitions = `
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]
        id: ID!
    }
`;

const queries = `bookCount: Int!\nallBooks(author: String, genres: [String]): [Book!]!`;

const mutationsDef = `
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!
`;

const queryResolver = {
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
};

const mutations = {
  addBook: async (root, args) => {
    const author = await Author.findOne({ name: args.author });

    const book = new Book({ ...args });

    // We need to check if the author is currently existing, if is not create a new one using the name passed
    // and add the book to the new author, or just add the ID of the existing author that was found
    if (!author) {
      try {
        const newAuthor = new Author({ name: args.author, books: [book._id] });
        await newAuthor.save();

        book.author = newAuthor._id;
      } catch (error) {
        throw new GraphQLError("Error adding book", {
          extensions: { code: "NEW_AUTHOR_ERROR", error },
        });
      }
    } else {
      try {
        author.books = [...author.books, book._id];
        await author.save();

        book.author = author._id;
      } catch (error) {
        throw new GraphQLError("Error adding book", {
          extensions: { code: "AUTHOR_SAVING_ERROR", error },
        });
      }
    }

    // Save the book and handle errors
    try {
      await book.save();
    } catch (error) {
      throw new GraphQLError("Error adding book", {
        extensions: { code: "BOOK_SAVING_ERROR", error },
      });
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
