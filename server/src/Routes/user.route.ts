import { FastifyInstance } from "fastify";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../Controllers/user.controller";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../Schemas/user.schema";
import { validate } from "../Middleware/validation.middleware";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/create-new", { preHandler: validate(createUserSchema) }, createUser);
  app.get("/", getAllUsers);
  app.get("/:id", { preHandler: validate(userIdSchema) }, getUserById);
  app.patch("/:id", { preHandler: validate(updateUserSchema) }, updateUserById);
  app.delete("/:id", { preHandler: validate(userIdSchema) }, deleteUserById);
};
