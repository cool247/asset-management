import { FastifyInstance } from "fastify";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../Controllers/user.controller";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", createUser);
  app.get("/", getAllUsers);
  app.patch("/:id", updateUserById);
  app.get("/:id", getUserById);
  app.delete("/:id", deleteUserById);
};
