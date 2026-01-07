import { log } from "node:console";
import { Movies, Users } from "../db/models.ts";
import { type IMovie } from "../types/movie.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    console.log(user);
    console.log(email);

    const userExists = await Users.findOne({ email: email });
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.insertOne({
      name: user,
      email: email,
      password: hashedPassword,
    });

    return "User created successfully";
  },

  login: async (
    _root: undefined,
    { email, password }: { email: string; password: string }
  ) => {
    const SECRET_KEY = process.env.JWT_SECRET;
    const user = await Users.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    if (!SECRET_KEY) {
      throw new Error("Secret key not defined");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return token;
  },
};
