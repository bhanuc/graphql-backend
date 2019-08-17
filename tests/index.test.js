const chai = require('chai');

const expect = chai.expect;
const { port, ext } = process.env;

const url = `http://localhost:${port}`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Test Movie Endpoint', (done) => {
        request.post(`/${ext}`)
        .send({ query: `{
            movies {
              title
              year
              rating
              actors {
                name
                birthday
                country
                directors {
                  name
                  birthday
                  country
                }
              }
            }
          }`})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.movies[0].title === "Dracula")
            done();
        })
    })

 
});
