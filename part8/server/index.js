const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

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

const typeDefs = `
${bookDefinitions}
${authorDefinitions}
  type Query {
    dummy: Int
    ${bookQueries}
    ${authorQueries}
  }
  
  type Mutation {
    ${bookMutationsDef}
    ${authorMutationsDef}
  }
`;

const resolvers = {
  Query: {
    ...bookQueriesResolver,
    ...authorQueriesResolver,
  },
  Mutation: {
    ...bookMutations,
    ...authorMutations,
  },
  Author,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
