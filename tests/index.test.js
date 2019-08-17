const chai = require('chai');

const expect = chai.expect;
const { port, ext } = process.env;

const url = `http://localhost:${port}`;
const request = require('supertest')(url);
let token;

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

it('Test Signup Mutation', (done) => {
  request.post(`/${ext}`)
  .send({ query: `  mutation {
    createUser (
      username: "bhanuc", password: "strongPassword"
    ) {
    token
    user {
      id
      name
    }
  }
}`})
  .expect(200)
  .end((err,res) => {
      if (err) return done(err);
      token = res.body.data.createUser.token;
      expect(res.body.data.createUser.token).to.not.be.empty;
      done();
  })
})


it('Test Login Mutation', (done) => {
  request.post(`/${ext}`)
  .send({ query: `mutation {
    login (
      username: "bhanuc", password: "strongPassword"
    ) {
    token
    user {
      id
      name
    }
  }
}`})
  .expect(200)
  .end((err,res) => {
      if (err) return done(err);
      token = res.body.data.login.token;
      expect(res.body.data.login.token).to.not.be.empty;
      done();
  })
})

it('Test Authenticated Route', (done) => {
  request.post(`/${ext}`)
  .set('Authorization', 'bearer ' + token)
  .send({ query: `{
    movies {
      title
      year
      rating
      scoutbase_rating
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
      expect(res.body.data.movies[0].scoutbase_rating).to.not.be.empty;
      done();
  })
})

 
});
