const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./data/typeDefs');
const resolvers = require('./data/resolvers');
const app = express();

const { port } = process.env;

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}/graphql`);
});
