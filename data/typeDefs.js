const { gql } = require('apollo-server');

const typeDefs = gql`

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
`;
module.exports = typeDefs;
