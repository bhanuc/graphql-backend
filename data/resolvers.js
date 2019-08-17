const movies = [{title: "Dracula", year: "2019", rating: "8", actors: [{name: "Robert Downey Jr", birthday: "19-07-1980", country: "US", directors:[{name: "Robert Uppney Sr", birthday: "19-07-1920", country: "US"}]}]}];

const resolvers = {
	Query: {
		async movies() {
				return movies;
		},
	}
};

module.exports = resolvers;
