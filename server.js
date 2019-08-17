const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
 
const typeDefs = require('./data/typeDefs');
const resolvers = require('./data/resolvers');
const app = express();
require('dotenv').config();


const { port , ext, secret} = process.env;

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ user: req.user })
});

const auth = jwt({
	secret,
	credentialsRequired: false,
});

// graphql endpoint
app.use(
    `/${ext}`,
    bodyParser.json(),
    auth
);

apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}/${ext}`);
});
