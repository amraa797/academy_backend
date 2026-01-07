import {
  movieTypesDefs,
  movieQueryTypeDefs,
  movieMutationTypeDefs,
  userTypesDefs,
  userQueryTypeDefs,
} from "./movies/graphgl/schema.ts";
import { movieQueries, userQueries } from "./movies/graphgl/queries.ts";
import { movieMutations } from "./movies/graphgl/mutation.ts";
import { userMutations } from "./movies/graphgl/mutation.ts";

export const typeDefs = `
  ${movieTypesDefs}
  ${userTypesDefs}

  type Query {
    ${movieQueryTypeDefs}
    ${userQueryTypeDefs}
  }

  type Mutation {
    ${movieMutationTypeDefs}
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: { ...movieQueries, ...userQueries },
  Mutation: {
    ...movieMutations,
    ...userMutations,
  },
};
