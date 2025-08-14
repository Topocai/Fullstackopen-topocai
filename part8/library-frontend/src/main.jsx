import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const typePolicies = {
  Query: {
    fields: {
      allBooks: {
        keyArgs: ["genres"],
        merge(existing = [], incoming) {
          return [...existing, ...incoming]; // using for mergin new book at existing book filtered list in cache
        },
      },
    },
  },
};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies,
  }),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
