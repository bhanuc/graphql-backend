const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: Int!
		username: String!
		name: String
	}

	type Query {
		movies: [Movie]
	}

	type Director {
		id: ID!
		name: String
		birthday: String
		country: String
	}

	type Actor {
		id: ID!
		name: String
		birthday: String
		country: String
		directors: [Director]
	}

	type Movie {
		id: ID!
		title: String
		year: String
		scoutbase_rating: String
		rating: String
		actors: [Actor]
	}

	type returnType {
		token: String
		user: User
	}

	type Mutation {
		createUser(username: String!, password: String!): returnType
		login(username: String!, password: String!): returnType
	}
`;
module.exports = typeDefs;
