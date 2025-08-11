const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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
  queries: bookQueries,
  queryResolver: bookQueriesResolver,
  mutationsDef: bookMutationsDef,
  mutations: bookMutations,
} = require("./definitions/books");
const {
  definitions: authorDefinitions,
  queries: authorQueries,
  queryResolver: authorQueriesResolver,
  Author,
  mutationsDef: authorMutationsDef,
  mutations: authorMutations,
} = require("./definitions/authors");

const {
  definitions: userDefinitions,
  queries: userQueries,
  queryResolver: userQueriesResolver,
  mutationsDef: userMutationsDef,
  mutations: userMutations,
} = require("./definitions/users");

//==================================[graphql definitions, resolvers, queries, mutations, etc.]==================================

const typeDefs = `
${bookDefinitions}
${authorDefinitions}
${userDefinitions}
  type Query {
    ${bookQueries}
    ${authorQueries}
    ${userQueries}
  }
  
  type Mutation {
    ${bookMutationsDef}
    ${authorMutationsDef}
    ${userMutationsDef}
  }
`;

const resolvers = {
  Query: {
    ...bookQueriesResolver,
    ...authorQueriesResolver,
    ...userQueriesResolver,
  },
  Mutation: {
    ...bookMutations,
    ...authorMutations,
    ...userMutations,
  },
  Author,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, status }) => {
    console.log(`Receibed request: ${req.method}`);

    // Using authorization bearer header type, check if user is logged in, and add to the context

    const auth = req ? req.headers?.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const loggedUser = await UserModel.findById(decodedToken.id);
      return { loggedUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
