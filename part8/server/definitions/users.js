const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const UserModel = require("../models/User");

const definitions = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    extend type Query {
        me: User
    }

    extend type Mutation {
      createUser(
        username: String!
        favoriteGenre: String!
      ) : User
      login(
        username: String!
        password: String!
      ) : Token
    }
`;

const resolvers = {
  Query: {
    me: async (r, a, context) => context.loggedUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      const user = new UserModel({ username, favoriteGenre });
      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "USER_CREATION_ERROR",
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new GraphQLError("User not found");
      }
      if (password !== "secretshy") {
        throw new GraphQLError("Invalid password");
      }

      const userToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userToken, process.env.SECRET) };
    },
  },
};

module.exports = {
  definitions,
  resolvers,
};
