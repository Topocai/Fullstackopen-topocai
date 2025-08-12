const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const express = require("express");
const cors = require("cors");
const http = require("http");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const UserModel = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

//==================================[graphql definitions, resolvers, queries, mutations, etc.]==================================
const {
  definitions: bookDefinitions,
  resolvers: bookResolvers,
} = require("./definitions/books");
const {
  definitions: authorDefinitions,
  resolvers: authorResolvers,
} = require("./definitions/authors");

const {
  definitions: userDefinitions,
  resolvers: userResolvers,
} = require("./definitions/users");

const typeDefs = `
  type Query {
    _empty: String!
  }

  type Mutation {
    _empty: String!
  }

  type Subscription {
    _empty: String!
  }
`;

const { merge } = require("lodash");

const resolvers = {};

//==================================[graphql definitions, resolvers, queries, mutations, etc.]==================================

const userContext = async ({ req }) => {
  // Using authorization bearer header type, check if user is logged in, and add to the context

  const auth = req ? req.headers?.authorization : null;
  if (auth && auth.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
    const loggedUser = await UserModel.findById(decodedToken.id);
    return { loggedUser };
  }
};

const start = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const wServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({
    typeDefs: [typeDefs, bookDefinitions, authorDefinitions, userDefinitions],
    resolvers: merge(resolvers, bookResolvers, authorResolvers, userResolvers),
  });
  const serverCleanup = useServer({ schema }, wServer);

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/",
    expressMiddleware(apolloServer, {
      context: userContext,
    })
  );

  httpServer.listen(4000, () => {
    console.log("Apollo Server on http://localhost:4000");
  });
};

start();
