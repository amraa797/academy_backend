export const movieTypesDefs = `
  type Award {
     wins: Int
     nominations: Int
     text: String
  }

  type Movie {
    _id: ID
    title: String
    author: String
    awards: [Award]
   
  }

  input MovieInput {
    title: String
    author: String
  }

`;

export const movieQueryTypeDefs = `
  movie(_id: ID): Movie
  movies(title:String,page: Int!): [Movie]
`;

export const movieMutationTypeDefs = `
 addMovie(input: MovieInput): String
  sighUp(user: String, email: String, password: String): String
  login(email: String, password: String): String
 
`;

export const userTypesDefs = `
  type User {
    _id: ID
    name: String
    email: String
  }
`;

export const userQueryTypeDefs = `
  user(_id: ID): User
`;
