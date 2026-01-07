import { Movies, Users } from "../db/models.ts";
import { type IMovie } from "../types/movie.ts";

export const movieMutations = {
  addMovie: async (_root: any, { input }: { input: IMovie }) => {
    const movie = await Movies.insertOne({});

    return "Success";
  },
};

export const userMutations = {
  sighUp: async (
    _root: undefined,
    { user, email, password }: { user: string; email: string; password: string }
  ) => {
    const newUser = await Users.insertOne;
  },
};
