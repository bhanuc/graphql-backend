const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const movies = [{title: "Dracula", year: "2019", rating: "8", actors: [{name: "Robert Downey Jr", birthday: "19-07-1980", country: "US", directors:[{name: "Robert Uppney Sr", birthday: "19-07-1920", country: "US"}]}]}];
const users = [];
const { secret } = process.env;

const resolvers = {
	Query: {
		async movies(_, args, {user}) {
				if (!user) {
					return movies;
				}
				const moviesWithRating = movies.map(m => (m.scoutbase_rating = String((Math.floor(Math.random() * 39) + 50)/10)) && m);          
				return moviesWithRating;
		},
	},
	Mutation: {
		async createUser(_, { username, password }) {
            const existingUsers = users.filter(u => u.username === username);
            if (existingUsers.length > 0) {
                throw new Error('User Exists with same username');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
			const user = {
				username,
                password: hashedPassword,
                name: "",
                id: users.length
            };
            users.push(user)
            const token = jsonwebtoken.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1y' });
			return {token, user};
		},

		// Handles user login
		async login(_, { username, password }) {
			const user = users.filter(u => u.username === username);;

			if (user.length === 0) {
				throw new Error('No user with that username');
			}

			const valid = await bcrypt.compare(password, user[0].password);

			if (!valid) {
				throw new Error('Incorrect password');
			}
            const token = jsonwebtoken.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1d' })
			return {token, user: user[0]};
		},
	},
};

module.exports = resolvers;
